import { TfiClose } from 'react-icons/tfi';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Button from '../../../../../../components/Button';
import styles from './Description.module.css';
function Description() {
    const [isMore, setMore] = useState(false);
    const desRef = useRef(null);
    const des =
        '<p>Nhanh Như Chớp Mùa 4 | Tập 23: Trương Thế Vinh được "ưu ái", Nguyễn Hải khiến Tăng Phúc "tổn thương"</p><p></p><p></p><p>📺 Đón xem Nhanh Như Chớp Mùa 4 phát sóng lúc 21h00 thứ Bảy hàng tuần trên kênh HTV7</p><p></p><p></p><p>📌Xem thêm Nhanh Như Chớp:</p><p>Nhanh Như Chớp Mùa 1: <a href="#">https://bit.ly/NhanhNhuChopMua1</a></p><p>Nhanh Như Chớp Mùa 2: <a href="#">https://bit.ly/NhanhNhuChopMua2</a></p><p>Nhanh Như Chớp Mùa 3: <a href="#">https://bit.ly/NhanhNhuChopMua3</a></p><p>Nhanh Như Chớp Mùa 4 : <a href="#">https://bit.ly/NhanhNhuChop4</a></p><p></p><p></p><p>💟 Bạn gì ơi!!! Có câu hỏi vui góp cho chương trình nhé 👉<a href="#">https://bit.ly/3zvtJrs</a></p><p></p><p></p><p><a href="#">#NhanhNhưChớp</a><a href="#">#NhanhNhưChớpMùa4</a><a href="#">#NNC #DongTayPromotion</a></p><p><a href="#">#NhanhNhuChop</a><a href="#">#Tập23</a><a href="#">#TrườngGiang</a><a href="#">#LâmVỹDạ</a></p><p><a href="#">#TrươngThếVinh</a><a href="#">#QuốcThiên</a><a href="#">#NguyễnHải</a><a href="#">#NguyễnĐìnhVũ</a><a href="#">#TăngPhúc</a><a href="#">#Fanny</a></p><p></p><p></p><p>📣 Subscribe kênh ĐÔNG TÂY PROMOTION OFFICIAL để không bỏ lỡ các chương trình SIÊU HẤP DẪN: <a href="#">https://bit.ly/SubDTP</a></p><p></p><p></p><p>📣 Subscribe kênh DONG TAY ENTERTAINMENT để xem các VIDEO HOT từ các show đỉnh nhất:<a href="#">https://bit.ly/SubDTE</a></p><p></p><p></p><p>⏩ Bí mật HẬU TRƯỜNG: <a href="#">https://bit.ly/HAUTRUONGDTP</a></p><p>⏩ SHOW HAY mỗi ngày: <a href="#">https://bit.ly/showhotDTP</a></p><p></p><p></p><p>👉 CÁC SHOW HOT KHÁC:</p><p>2 Ngày 1 Đêm Việt Nam: <a href="#">https://bit.ly/2Ngay1DemVN</a></p><p>7 Nụ Cười Xuân: <a href="#">https://bit.ly/7NCX_Mua6</a></p><p>Ơn Giời Cậu Đây Rồi: <a href="#">https://bit.ly/OnGioiCauDayRoiMua8</a></p><p>Nhanh Như Chớp: <a href="#">https://bit.ly/NhanhNhuChop4</a></p><p>Ký Ức Vui Vẻ: <a href="#">https://bit.ly/KYUCVUIVEMUA4</a></p><p></p><p></p><p>👉 Theo dõi các kênh chính thức của Dong Tay Promotion - thuộc sở hữu của DatVietVAC tại:</p><p>► Fanpage: <a href="#">https://www.facebook.com/DongTayPromoion</a></p><p>► Instagram: <a href="#">https://www.instagram.com/dongtaypromion</a></p><p>► TikTok: <a href="#">https://www.tiktok.com/@dongtaypromotion</a></p>';
    const handleToggleMore = () => {
        setMore(!isMore);
        if (isMore) {
            const autoBack = setInterval(() => {
                document.documentElement.scrollTop -= 20;
                if (document.documentElement.scrollTop <= desRef.current.offsetTop) {
                    clearInterval(autoBack);
                }
            }, 1);
        }
    };
    useEffect(() => {
        if (window.innerWidth <= 768 && isMore) {
            document.body.style.overflow = 'hidden';
            document.body.style.backgroundColor = 'rgba(0, 0, 0, .5)';
        } else {
            document.body.style.overflow = '';
            document.body.style.backgroundColor = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.backgroundColor = '';
        };
    }, [isMore]);
    return (
        <div ref={desRef} className={clsx(styles.desContainer)}>
            <div className={clsx(styles.des, { [styles.more]: isMore })}>
                <div className={clsx(styles.heading)}>
                    <h3>Nội dung mô tả</h3>
                    <TfiClose size={19} onClick={() => setMore(false)} />
                </div>
                <div className={clsx(styles.content)}>
                    <div className={clsx(styles.title)}>
                        <h3>
                            Mới nhất vụ tấn công trụ sở xã ở Đắk Lắk: 3 con tin kể lại những đêm
                            trắng dưới họng súng | TV24h
                        </h3>
                        <div className={clsx(styles.owner)}>
                            <img src="https://yt3.ggpht.com/ytc/AMLnZu8iE_CcyRx0x12MV1EvEMzJFVeoe6_6oavoSfLa0A=s48-c-k-c0x00ffffff-no-rj" />
                            <span>Nguyễn Tuấn Anh</span>
                        </div>
                        <div className={clsx(styles.info1)}>
                            <div className={clsx(styles.item)}>
                                <strong>39</strong>
                                <p>Lượt thích</p>
                            </div>
                            <div className={clsx(styles.item)}>
                                <strong>7075</strong>
                                <p>Lượt xem</p>
                            </div>
                            <div className={clsx(styles.item)}>
                                <strong>16 thg 6</strong>
                                <p>2023</p>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.info2)}>
                        <strong style={{ color: '#606060' }}>
                            <span>617 N lượt xem</span>
                            <span style={{ display: 'inline-block', marginLeft: '7px' }}>
                                23 giờ trước
                            </span>
                        </strong>
                    </div>
                    {des ? (
                        <div
                            className={clsx(styles.text)}
                            dangerouslySetInnerHTML={{ __html: des }}
                        ></div>
                    ) : (
                        <span className={clsx(styles.noDes)}>Không có mô tả video</span>
                    )}
                </div>
            </div>
            {des && (
                <div className={clsx(styles.more)}>
                    <Button onClick={handleToggleMore}>{isMore ? 'ẩn bớt' : '...thêm'}</Button>
                </div>
            )}
        </div>
    );
}

export default Description;
