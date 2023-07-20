import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsPlayCircle } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import { AiOutlinePauseCircle } from 'react-icons/ai';

import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import clsx from 'clsx';
import queryString from 'query-string';
import Modal from './Modal';
import styles from './Right.module.css';
function Right() {
    const { search } = useLocation();
    const { page } = queryString.parse(search);
    const [isOnHistory, setIsOnHistory] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    return (
        <div className={clsx(styles.wrapper)}>
            {isShowModal && (
                <Modal
                    isOnHistory={isOnHistory}
                    setIsOnHistory={setIsOnHistory}
                    setIsShowModal={setIsShowModal}
                />
            )}
            <div className={clsx(styles.lists)}>
                <div className={clsx(styles.item, styles.title)}>
                    <span>Loại hoạt động</span>
                </div>
                <Link to={'/history'} className={clsx(styles.item, styles.link)}>
                    <span>Nhật ký xem</span>
                    <div
                        className={clsx(styles.radioContainer, {
                            [styles.active]: !page || page !== 'community',
                        })}
                    >
                        <div className={clsx(styles.radio)}></div>
                    </div>
                </Link>
                <Link to={'/history?page=community'} className={clsx(styles.item, styles.link)}>
                    <span>Cộng đồng</span>
                    <div
                        className={clsx(styles.radioContainer, {
                            [styles.active]: page && page === 'community',
                        })}
                    >
                        <div className={clsx(styles.radio)}></div>
                    </div>
                </Link>
                {(!page || page !== 'community') && (
                    <>
                        <div className={clsx(styles.item)}>
                            <div className={clsx(styles.btn, styles.disable)}>
                                <div className={clsx(styles.icon)}>
                                    <RiDeleteBin6Line size={20} />
                                </div>
                                <span>Xóa tất cả video đã xem</span>
                            </div>
                        </div>
                        <div className={clsx(styles.item)}>
                            <div
                                className={clsx(styles.btn)}
                                onClick={() => setIsShowModal(!isShowModal)}
                            >
                                {isOnHistory ? (
                                    <>
                                        <div className={clsx(styles.icon)}>
                                            <AiOutlinePauseCircle size={20} />
                                        </div>
                                        <span>Tạm ngừng lưu danh sách video đã xem</span>
                                    </>
                                ) : (
                                    <>
                                        <div className={clsx(styles.icon)}>
                                            <BsPlayCircle size={20} />
                                        </div>
                                        <span>Bật nhật ký xem</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                )}
                <div className={clsx(styles.item)}>
                    <div className={clsx(styles.btn)}>
                        <div className={clsx(styles.icon)}>
                            <IoSettingsOutline size={20} />
                        </div>
                        <span>Quản lý toàn bộ lịch sử hoạt động</span>
                    </div>
                </div>
                <Link to={'#'} className={clsx(styles.link2)}>
                    <span>Nhật ký xem và tìm kiếm</span>
                </Link>
                <Link to={'#'} className={clsx(styles.link2)}>
                    <span>Bình luận</span>
                </Link>
                <Link to={'#'} className={clsx(styles.link2)}>
                    <span>Trò chuyện trực tiếp</span>
                </Link>
            </div>
        </div>
    );
}

export default Right;
