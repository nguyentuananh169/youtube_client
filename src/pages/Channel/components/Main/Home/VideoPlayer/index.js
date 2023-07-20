import { BsDot, BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';
import { RiShareForwardFill, RiCloseLine } from 'react-icons/ri';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import VideoPlay from '../../../../../../components/VideoPlay';
import Tooltip from '../../../../../../components/Tooltip';
import styles from './VideoPlayer.module.css';

function VideoPlayer() {
    const [isShow, setIsShow] = useState(false);
    const des =
        '<p>Nhanh Như Chớp Mùa 4 | Tập 23: Trương Thế Vinh được "ưu ái", Nguyễn Hải khiến Tăng Phúc "tổn thương"</p><p></p><p></p><p>📺 Đón xem Nhanh Như Chớp Mùa 4 phát sóng lúc 21h00 thứ Bảy hàng tuần trên kênh HTV7</p><p></p><p></p><p>📌Xem thêm Nhanh Như Chớp:</p><p>Nhanh Như Chớp Mùa 1: <a href="#">https://bit.ly/NhanhNhuChopMua1</a></p><p>Nhanh Như Chớp Mùa 2: <a href="#">https://bit.ly/NhanhNhuChopMua2</a></p><p>Nhanh Như Chớp Mùa 3: <a href="#">https://bit.ly/NhanhNhuChopMua3</a></p><p>Nhanh Như Chớp Mùa 4 : <a href="#">https://bit.ly/NhanhNhuChop4</a></p><p></p><p></p><p>💟 Bạn gì ơi!!! Có câu hỏi vui góp cho chương trình nhé 👉<a href="#">https://bit.ly/3zvtJrs</a></p><p></p><p></p><p><a href="#">#NhanhNhưChớp</a><a href="#">#NhanhNhưChớpMùa4</a><a href="#">#NNC #DongTayPromotion</a></p><p><a href="#">#NhanhNhuChop</a><a href="#">#Tập23</a><a href="#">#TrườngGiang</a><a href="#">#LâmVỹDạ</a></p><p><a href="#">#TrươngThếVinh</a><a href="#">#QuốcThiên</a><a href="#">#NguyễnHải</a><a href="#">#NguyễnĐìnhVũ</a><a href="#">#TăngPhúc</a><a href="#">#Fanny</a></p><p></p><p></p><p>📣 Subscribe kênh ĐÔNG TÂY PROMOTION OFFICIAL để không bỏ lỡ các chương trình SIÊU HẤP DẪN: <a href="#">https://bit.ly/SubDTP</a></p><p></p><p></p><p>📣 Subscribe kênh DONG TAY ENTERTAINMENT để xem các VIDEO HOT từ các show đỉnh nhất:<a href="#">https://bit.ly/SubDTE</a></p><p></p><p></p><p>⏩ Bí mật HẬU TRƯỜNG: <a href="#">https://bit.ly/HAUTRUONGDTP</a></p><p>⏩ SHOW HAY mỗi ngày: <a href="#">https://bit.ly/showhotDTP</a></p><p></p><p></p><p>👉 CÁC SHOW HOT KHÁC:</p><p>2 Ngày 1 Đêm Việt Nam: <a href="#">https://bit.ly/2Ngay1DemVN</a></p><p>7 Nụ Cười Xuân: <a href="#">https://bit.ly/7NCX_Mua6</a></p><p>Ơn Giời Cậu Đây Rồi: <a href="#">https://bit.ly/OnGioiCauDayRoiMua8</a></p><p>Nhanh Như Chớp: <a href="#">https://bit.ly/NhanhNhuChop4</a></p><p>Ký Ức Vui Vẻ: <a href="#">https://bit.ly/KYUCVUIVEMUA4</a></p><p></p><p></p><p>👉 Theo dõi các kênh chính thức của Dong Tay Promotion - thuộc sở hữu của DatVietVAC tại:</p><p>► Fanpage: <a href="#">https://www.facebook.com/DongTayPromoion</a></p><p>► Instagram: <a href="#">https://www.instagram.com/dongtaypromion</a></p><p>► TikTok: <a href="#">https://www.tiktok.com/@dongtaypromotion</a></p>';
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.videoPlayer)}>
                <VideoPlay autoPlay mute="true" size="medium" />
                <div className={clsx(styles.top)}>
                    <div className={clsx(styles.title)}>
                        <Link to={'/watch/22'}>
                            Nhạc Thư Giãn Giảm Căng Thẳng Mệt Mỏi Tức Thì, Xua Tan Cảm Xúc Tiêu Cực,
                            Tăng Cường Sự Tập Trung
                        </Link>
                    </div>
                    <div className={clsx(styles.btnDot)} onClick={() => setIsShow(!isShow)}>
                        <BsThreeDotsVertical size={20} color="#fff" />
                    </div>
                </div>
                {isShow && (
                    <div className={clsx(styles.overlay)}>
                        <div className={clsx(styles.close)} onClick={() => setIsShow(!isShow)}>
                            <Tooltip
                                content="Đóng"
                                customStyle={{
                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                    right: 0,
                                    top: 'calc(100% + 15px)',
                                }}
                            />
                            <RiCloseLine size={40} />
                        </div>
                        <div className={clsx(styles.buttons)}>
                            <div className={clsx(styles.btn)}>
                                <Tooltip
                                    content="Xem sau"
                                    customStyle={{
                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                        left: '50%',
                                        top: 'calc(100% + 15px)',
                                        transform: 'translate(-50%,0)',
                                        whiteSpace: 'nowrap',
                                    }}
                                />
                                <AiFillClockCircle size={35} color="#fff" />
                            </div>
                            <div className={clsx(styles.btn)}>
                                <Tooltip
                                    content="Chia sẻ"
                                    customStyle={{
                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                        left: '50%',
                                        top: 'calc(100% + 15px)',
                                        transform: 'translate(-50%,0)',
                                        whiteSpace: 'nowrap',
                                    }}
                                />
                                <RiShareForwardFill size={35} color="#fff" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={clsx(styles.details)}>
                <Link className={clsx(styles.link)} to="/watch/22"></Link>
                <div className={clsx(styles.title)}>
                    <h3>Tương Lai Của Dev React.JS | Nên Học Gì Để Không Thất Nghiệ</h3>
                </div>
                <div className={clsx(styles.time)}>
                    <span>12.528 lượt xem</span>
                    <BsDot size={20} />
                    <span>3 năm trước</span>
                </div>
                <div className={clsx(styles.des)}>
                    {des ? (
                        <div dangerouslySetInnerHTML={{ __html: des }}></div>
                    ) : (
                        <span className={clsx(styles.noDes)}>Không có mô tả video</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;
