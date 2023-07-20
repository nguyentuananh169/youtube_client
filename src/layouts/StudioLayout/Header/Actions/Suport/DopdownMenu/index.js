import { VscChromeClose } from 'react-icons/vsc';
import { GiNotebook } from 'react-icons/gi';
import { MdOpenInNew } from 'react-icons/md';
import { FiArrowLeft } from 'react-icons/fi';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Tooltip from '../../../../../../components/Tooltip';
import SearchBox from './SearchBox';
import styles from './DropdownMenu.module.css';
function DropdownMenu({ isShow, setShow }) {
    const [tabSearch, setTabSearch] = useState(false);
    const wrapperRef = useRef(null);
    const headingRef = useRef(null);
    const h3Ref = useRef(null);
    const topRef = useRef(0);
    const leftRef = useRef(0);
    useEffect(() => {
        if (isShow) {
            handleDefaultPosition();
        }
    }, [isShow]);
    useEffect(() => {
        h3Ref.current.addEventListener('mousedown', (e) => {
            handleMouseDown(e);
            document.addEventListener('mousemove', handleChangePosition);
        });
        return () => {
            document.removeEventListener('mousedown', () => {
                document.removeEventListener('mousemove', handleChangePosition);
            });
        };
    }, []);
    useEffect(() => {
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleChangePosition);
        });
        return () => {
            document.removeEventListener('mouseup', () => {
                document.removeEventListener('mousemove', handleChangePosition);
            });
        };
    }, []);
    const handleMouseDown = (e) => {
        const posX = e.pageX;
        const posY = e.pageY;
        const wrapperElement = wrapperRef.current;
        const wrapperElementLetf = wrapperElement.offsetLeft;
        const wrapperElementTop = wrapperElement.offsetTop;
        const top = posY - wrapperElementTop;
        const left = posX - wrapperElementLetf;
        topRef.current = top;
        leftRef.current = left;
    };
    const handleDefaultPosition = () => {
        const element = wrapperRef.current;
        const elementWidth = element.clientWidth;
        const parentElement = element.parentElement;
        const parentElementPos = parentElement.getBoundingClientRect();
        let top = parentElementPos.top + parentElementPos.bottom + 25;
        let left = parentElementPos.right - elementWidth;
        if (left < 0 || left + elementWidth > window.innerWidth) {
            left = 0;
        }
        wrapperRef.current.style.top = `${top}px`;
        wrapperRef.current.style.left = `${left}px`;
    };
    const handleChangePosition = (e) => {
        const posX = e.pageX;
        const posY = e.pageY;
        const topTemp = topRef.current;
        const leftTemp = leftRef.current;
        const wrapperElement = wrapperRef.current;
        const top = posY - topTemp;
        const left = posX - leftTemp;
        wrapperElement.style.top = `${top}px`;
        wrapperElement.style.left = `${left}px`;
    };
    return (
        <div ref={wrapperRef} className={clsx(styles.wrapper)} onClick={(e) => e.stopPropagation()}>
            <div ref={headingRef} className={clsx(styles.heading)}>
                <button
                    className={clsx(styles.arrowLeft, { [styles.show]: tabSearch })}
                    onClick={() => setTabSearch(!tabSearch)}
                >
                    <Tooltip
                        content={'Quay lại'}
                        customStyle={{
                            top: 'calc(100% + 5px)',
                            left: '0',
                            backgroundColor: '#000',
                            fontSize: '1.1rem',
                            padding: '6px 9px',
                            whiteSpace: 'nowrap',
                            zIndex: '1',
                        }}
                    />
                    <FiArrowLeft size={18} color="#1f1f1f" />
                </button>
                <h3 ref={h3Ref}>
                    <Tooltip
                        content={'Nhấn và kéo để di chuyển'}
                        customStyle={{
                            top: 'calc(100% + 23px)',
                            left: '50%',
                            transform: 'translate(-50%,-50%)',
                            backgroundColor: '#000',
                            fontSize: '1.1rem',
                            padding: '6px 9px',
                            whiteSpace: 'nowrap',
                            zIndex: '1',
                        }}
                    />
                    Trợ giúp
                </h3>
                <button onClick={() => setShow(false)}>
                    <Tooltip
                        content={'Đóng'}
                        customStyle={{
                            top: 'calc(100% + 5px)',
                            right: '-5px',
                            backgroundColor: '#000',
                            fontSize: '1.1rem',
                            padding: '6px 9px',
                            zIndex: '1',
                        }}
                    />
                    <VscChromeClose size={18} color="#1f1f1f" />
                </button>
            </div>

            <div className={clsx(styles.body, { [styles.tabSearch]: tabSearch })}>
                {!tabSearch && (
                    <>
                        <ul className={clsx(styles.main)}>
                            <li className={clsx(styles.title)}>
                                <span>Tài nguyên trợ giúp thường dùng</span>
                            </li>
                            <li>
                                <Link to={'#'}>
                                    <strong className={clsx(styles.icon)}>
                                        <GiNotebook size={18} color="#0b57d0" />
                                    </strong>
                                    <span>Tải video lên Youtube</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'#'}>
                                    <strong className={clsx(styles.icon)}>
                                        <GiNotebook size={18} color="#0b57d0" />
                                    </strong>
                                    <span>Quản lý chế độ cài đặt của kênh</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'#'}>
                                    <strong className={clsx(styles.icon)}>
                                        <GiNotebook size={18} color="#0b57d0" />
                                    </strong>
                                    <span>Xác minh tài khoản Youtube</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'#'}>
                                    <strong className={clsx(styles.icon)}>
                                        <GiNotebook size={18} color="#0b57d0" />
                                    </strong>
                                    <span>Tải video ngắn lên Youtube</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'#'}>
                                    <strong className={clsx(styles.icon)}>
                                        <GiNotebook size={18} color="#0b57d0" />
                                    </strong>
                                    <span>Cách kiếm tiền trên Youtube</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'#'}>
                                    <strong className={clsx(styles.icon)}>
                                        <GiNotebook size={18} color="#0b57d0" />
                                    </strong>
                                    <span>Mở khóa các tính năng bậc trung và nâng cao</span>
                                </Link>
                            </li>
                        </ul>
                        <div className={clsx(styles.openInNew)}>
                            <Link to={'#'}>
                                Truy cập Diễn đàn trợ giúp
                                <MdOpenInNew size={18} />
                            </Link>
                        </div>
                    </>
                )}
                <SearchBox tabSearch={tabSearch} setTabSearch={setTabSearch} />
            </div>
        </div>
    );
}

export default DropdownMenu;
