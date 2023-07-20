import { TfiSearch, TfiClose } from 'react-icons/tfi';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './SearchBox.module.css';
import { Link } from 'react-router-dom';
import useClickOutSide from '../../../../hook/useClickOutSide';
import DotMenu from '../../../../components/DotMenu';
function SearchBox() {
    const [elementRef, isShow, setShow] = useClickOutSide(false);
    const [value, setValue] = useState('');
    const [isLoading, setLoading] = useState(false);
    const timeoutRef = useRef(null);

    const handleSetValue = (text) => {
        setLoading(false);
        setValue(text);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }, 500);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
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
                        <div className={clsx(styles.title)}>Video gần đây</div>
                        {Array(5)
                            .fill(0)
                            .map((item, index) => (
                                <Link key={index} to={'#'} className={clsx(styles.item)}>
                                    <div className={clsx(styles.img)}>
                                        <img src="https://i9.ytimg.com/vi/HP0jFLsSP4Y/mqdefault.jpg?sqp=COSUs6MG-oaymwEmCMACELQB8quKqQMa8AEB-AH4CYAC0AWKAgwIABABGD4gYShlMA8=&rs=AOn4CLCSJwXjLSF6SREh2iWyIRomaJMeSQ" />
                                        <span className={clsx(styles.duration)}>0:45</span>
                                    </div>
                                    <div className={clsx(styles.text)}>
                                        <span>Đồng hồ đếm ngược 30s Mp4 Linh Phan</span>
                                        <p>Đây là mô tả</p>
                                    </div>
                                    <div className={clsx(styles.time)}>
                                        <p>23 thg 5, 2023</p>
                                        <p>Ngày tải lên</p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchBox;
