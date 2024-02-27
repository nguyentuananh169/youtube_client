import { TfiSearch, TfiClose } from 'react-icons/tfi';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import useClickOutSide from '../../../../hook/useClickOutSide';
import DotMenu from '../../../../components/DotMenu';
import Result from './Result';
import videoApi from '../../../../api/videoApi';
import styles from './SearchBox.module.css';
function SearchBox() {
    const [elementRef, isShow, setShow] = useClickOutSide(false);
    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const timeoutRef = useRef(null);
    const fetchVideo = async (text) => {
        if (isLoading || text === '') {
            return;
        }
        setLoading(true);
        const params = {
            type: 'get_by_token',
            search_type: 'title',
            keyword: text,
            limit: 5,
        };
        const response = await videoApi.get(params);
        setLoading(false);
        setIsSearch(true);
        if (response[0]?.error) {
            return;
        }
        setResult(response.videoList);
    };
    const handleSetValue = (text) => {
        setValue(text);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            fetchVideo(text);
        }, 500);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    useEffect(() => {
        if (!isShow) {
            setIsSearch(false);
        }
    }, [isShow]);
    return (
        <>
            <div
                className={clsx(styles.overlay, { [styles.show]: isShow })}
                onClick={() => setShow(false)}
            ></div>
            <div ref={elementRef} className={clsx(styles.wrapper, { [styles.show]: isShow })}>
                <form className={clsx(styles.form)} onSubmit={handleSubmit}>
                    <div className={clsx(styles.icon)}>
                        <TfiSearch size={17} color={isShow ? '0d0d0d' : '#ccc'} />
                    </div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm trên kênh của bạn"
                        value={value}
                        onChange={(e) => handleSetValue(e.target.value)}
                        onClick={() => setShow(true)}
                    />

                    <div
                        className={clsx(styles.close, { [styles.show]: value !== '' })}
                        onClick={() => handleSetValue('')}
                    >
                        <TfiClose size={17} color={isShow ? '0d0d0d' : '#ccc'} />
                    </div>
                </form>
                <div className={clsx(styles.iconSearch)} onClick={() => setShow(!isShow)}>
                    {isShow ? (
                        <DotMenu icon={<TfiClose size={17} color={isShow ? '0d0d0d' : '#ccc'} />} />
                    ) : (
                        <DotMenu
                            icon={<TfiSearch size={17} color={isShow ? '0d0d0d' : '#ccc'} />}
                        />
                    )}
                </div>
                {isLoading && <div className={clsx(styles.loading)}></div>}
                {isShow && !isLoading && (
                    <div className={clsx(styles.menu)}>
                        <div className={clsx(styles.title)}>
                            {!isSearch && result.length === 0
                                ? 'Nhập từ khóa tìm kiếm'
                                : `5 kết quả gần nhất (${result.length})`}
                        </div>
                        {result.map((item) => (
                            <Result key={item.video_id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchBox;
