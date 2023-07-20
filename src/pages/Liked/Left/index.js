import { TfiDownload } from 'react-icons/tfi';
import { FaRandom, FaPlay } from 'react-icons/fa';
import { SlEye } from 'react-icons/sl';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Tooltip from '../../../components/Tooltip';
import DotMenu from '../../../components/DotMenu';
import MenuFixed from '../../../components/MenuFixed';
import useClickOutSide from '../../../hook/useClickOutSide';
import styles from './Left.module.css';
function Left() {
    const menu = [
        {
            icon: <SlEye size={17} color="#000" />,
            text: 'Hiện những video không xem được',
        },
    ];
    const [elementRef, isShow, setShow] = useClickOutSide();
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.location)}>
                <Link className={clsx(styles.img)}>
                    <img src="https://tse3.mm.bing.net/th?id=OIP.wkIkPgS_pmHkzs_Pw2mhuQHaEK&pid=Api&P=0&h=180" />
                    <div className={clsx(styles.overlay)}>
                        <FaPlay size={17} />
                        <p>Phát tất cả</p>
                    </div>
                </Link>
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.text)}>
                        <div className={clsx(styles.title)}>
                            <span>Video đã thích</span>
                        </div>
                        <div className={clsx(styles.name)}>
                            <Link to={'#'}>Nguyễn Tuấn Anh</Link>
                            <Tooltip
                                content={'Nguyễn Tuấn Anh'}
                                customStyle={{
                                    bottom: 'calc(100%)',
                                    left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    whiteSpace: 'nowrap',
                                    fontSize: '1.1rem',
                                }}
                            />
                        </div>
                        <div className={clsx(styles.statistical)}>
                            <p>29 video</p>
                            <p>0 lượt xem</p>
                            <p>Cập nhật lần cuối vào 16 thg 6, 2023</p>
                        </div>
                    </div>
                    <div className={clsx(styles.actions)}>
                        <div className={clsx(styles.download)}>
                            <Tooltip
                                content={'Tải xuống'}
                                customStyle={{
                                    top: 'calc(100% + 10px)',
                                    left: '10px',
                                    whiteSpace: 'nowrap',
                                    fontSize: '1.2rem',
                                }}
                            />
                            <DotMenu icon={<TfiDownload size={17} />} />
                        </div>
                        <div
                            className={clsx(styles.dot)}
                            ref={elementRef}
                            onClick={() => setShow(!isShow)}
                        >
                            <DotMenu />
                            {isShow && <MenuFixed isDisableScroll menulist={menu} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.btns)}>
                <button>
                    <FaPlay size={17} />
                    <span>Phát tất cả</span>
                </button>
                <button>
                    <FaRandom size={17} />
                    <span>Trộn bài</span>
                </button>
            </div>
        </div>
    );
}

export default Left;
