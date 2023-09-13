import { useEffect, useState } from 'react';
import clsx from 'clsx';
import FilterSlider from '../../components/FilterSlider';
import styles from './Search.module.css';
import { useRef } from 'react';
import useStore from '../../hook/useStore';
import ResultList from './components/ResultList';
function Search() {
    const menuList = [
        {
            id: '',
            name: 'Video',
        },
        {
            id: 'user',
            name: 'Kênh',
        },
        {
            id: 'playlist',
            name: 'Danh sách phát',
        },
        {
            id: 'live',
            name: 'Trực tiếp',
        },
    ];
    const [isLoading, setIsLoading] = useState(true);
    const [width, setWidth] = useState(0);
    const [categoryId, setCatgoryId] = useState('');
    const categoryRef = useRef(null);
    const [state] = useStore();

    useEffect(() => {
        const handleResize = () => {
            const categoryEl = categoryRef.current;
            const width = categoryEl.clientWidth;
            setWidth(width);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [state.isToggleNavbar]);
    const handleSetCatgoryId = (id) => {
        setCatgoryId(id);
        setIsLoading(true);
    };

    return (
        <div className={clsx(styles.wrapper)}>
            {isLoading && <div className={clsx(styles.overlay)}></div>}
            <div ref={categoryRef} className={clsx(styles.category)}>
                <div className={clsx(styles.fixed, { [styles.hidden]: state.isHiddenHeader })}>
                    <FilterSlider
                        itemList={menuList}
                        width={width}
                        handleClick={(id) => handleSetCatgoryId(id)}
                    />
                </div>
            </div>
            <ResultList
                categoryId={categoryId}
                isLoadingPage={isLoading}
                setIsLoadingPage={setIsLoading}
            />
        </div>
    );
}

export default Search;
