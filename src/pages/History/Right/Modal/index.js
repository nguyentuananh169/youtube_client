import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import styles from './Modal.module.css';
function Modal({ isOnHistory, setIsOnHistory, setIsShowModal }) {
    const user = useSelector((state) => state.auth.user);
    const handleClickBtnOk = () => {
        setIsOnHistory(!isOnHistory);
        setIsShowModal(false);
    };
    return (
        <div className={clsx(styles.wrapper)} onClick={() => setIsShowModal(false)}>
            <div className={clsx(styles.modal)} onClick={(e) => e.stopPropagation()}>
                <div className={clsx(styles.title)}>
                    <span>
                        {isOnHistory ? 'Tạm dừng lưu danh sách video đã xem?' : 'Bật nhật ký xem?'}
                    </span>
                </div>
                <div className={clsx(styles.userName)}>
                    <span>
                        {user.user_name} ({user.user_email})
                    </span>
                </div>
                <div className={clsx(styles.body)}>
                    {isOnHistory ? (
                        <>
                            <p>
                                Khi tạm dừng nhật ký xem trên YouTube, bạn có thể khó tìm thấy các
                                video đã xem hơn và có thể thấy số video đề xuất mới ít hơn trên
                                YouTube và các sản phẩm khác của Google.
                            </p>
                            <p>
                                Xin lưu ý rằng việc tạm dừng tùy chọn cài đặt này sẽ không xóa bất
                                kỳ hoạt động nào trước đây. Tuy nhiên, bạn có thể xem, chỉnh sửa và
                                xóa dữ liệu riêng tư về{' '}
                                <Link to={'#'}>nhật ký xem trên YouTube</Link> của mình bất cứ lúc
                                nào.
                            </p>
                        </>
                    ) : (
                        <>
                            <p>
                                Nhật ký xem cá nhân giúp bạn dễ dàng tìm thấy các video đã xem gần
                                đây trên YouTube và cải thiện nội dung đề xuất trong YouTube và các
                                sản phẩm khác của Google.
                            </p>
                            <p>
                                Khi nhật ký xem trên YouTube ở trạng thái bật, dữ liệu này có thể
                                được lưu từ bất kỳ thiết bị nào mà bạn đã đăng nhập. Bạn có thể kiểm
                                soát và xem lại hoạt động của mình trên trang{' '}
                                <Link to="#">Tài khoản của tôi</Link> bất cứ lúc nào.
                            </p>
                        </>
                    )}
                </div>
                <div className={clsx(styles.bottom)}>
                    <button
                        className={clsx(styles.btn, styles.close)}
                        onClick={() => setIsShowModal(false)}
                    >
                        Hủy
                    </button>
                    <button className={clsx(styles.btn, styles.ok)} onClick={handleClickBtnOk}>
                        {isOnHistory ? 'Tạm dừng' : 'Bật'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
