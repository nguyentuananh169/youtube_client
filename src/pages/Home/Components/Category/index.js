import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import FilterSlider from '../../../../components/FilterSlider';
import categoryApi from '../../../../api/categoryApi';
import styles from './Category.module.css';
function Category({ setCategoryId }) {
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        const fetchCatgory = async () => {
            const initCategory1 = [
                {
                    id: '',
                    name: 'Tất cả',
                },
            ];
            const initCategory2 = [
                {
                    id: 'live',
                    name: 'Trực tiếp',
                },
                {
                    id: 'playlist',
                    name: 'Danh sách kết hợp',
                },
            ];
            const response = await categoryApi.get();
            setCategoryList([...initCategory1, ...response, ...initCategory2]);
        };
        fetchCatgory();
    }, []);
    const [width, setWidth] = useState(null);
    const wrapperRef = useRef(null);
    const isHiddenHeader = useSelector((state) => state.hiddenHeader.isHiddenHeader);
    const isToggleNavbar = useSelector((state) => state.toggleNavbar.isToggleNavbar);
    useEffect(() => {
        const handleResize = () => {
            const wrapperEl = wrapperRef.current;
            const width = wrapperEl.clientWidth;
            setWidth(width);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isToggleNavbar, categoryList]);
    const hanleClickCategory = (id) => {
        setCategoryId(id);
    };
    return (
        <div ref={wrapperRef} className={clsx(styles.wrapper)}>
            <div className={clsx(styles.category, { [styles.hidden]: isHiddenHeader })}>
                <FilterSlider
                    itemList={categoryList}
                    width={width}
                    handleClick={hanleClickCategory}
                />
            </div>
        </div>
    );
}

export default Category;
