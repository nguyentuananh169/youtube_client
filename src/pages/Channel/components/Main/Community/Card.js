import { SlDislike, SlLike, SlBubbles } from 'react-icons/sl';
import { HiOutlineFlag } from 'react-icons/hi';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import VideoCard from '../../../../../components/VideoCard';
import styles from './Community.module.css';
import Tooltip from '../../../../../components/Tooltip';
import DotMenu from '../../../../../components/DotMenu';
import useClickOutSide from '../../../../../hook/useClickOutSide';
import MenuFixed from '../../../../../components/MenuFixed';
function Card() {
    const [elementRef, isShow, setShow] = useClickOutSide();
    const menuList = [
        {
            icon: <HiOutlineFlag size={17} />,
            text: 'Báo cáo vi phạm',
        },
    ];
    return (
        <div className={clsx(styles.item)}>
            <div className={clsx(styles.img)}>
                <img src="https://yt3.googleusercontent.com/gqG_aR9B8SlJw4cW9PVq0N7toikRLfV4rBYwKShDqZ49sScY9R4FZK6_2mfsO_uBsJ4ayNN5Aw=s176-c-k-c0x00ffffff-no-rj" />
            </div>
            <div className={clsx(styles.main)}>
                <div className={clsx.info}>
                    <Link to={'/channel/@BuiChill/home'} className={clsx(styles.name)}>
                        Bụi Chill
                    </Link>
                    <span className={clsx(styles.time)}>13 giờ trước</span>
                </div>
                <div className={clsx(styles.title)}>
                    <span>
                        Nhạc Chill Tiktok - Tổng Hợp Những Bài Hát Tiktok "Nghe Là Nghiện" - Nhạc
                        Lofi Chill Buồn 2023
                    </span>
                </div>
                <div className={clsx(styles.videoCard)}>
                    {/* <VideoCard row width={'30%'} showDes /> */}
                </div>
                <div className={clsx(styles.actions)}>
                    <button className={clsx(styles.btn)}>
                        <Tooltip
                            content={'Thích'}
                            customStyle={{
                                whiteSpace: 'nowrap',
                                top: 'calc(100% + 20px)',
                                lef: '0',
                            }}
                        />
                        <SlLike size={21} color="#606060" />
                    </button>
                    <span className={clsx(styles.count)}>8</span>
                    <button className={clsx(styles.btn)}>
                        <Tooltip
                            content={'Không thích'}
                            customStyle={{
                                whiteSpace: 'nowrap',
                                top: 'calc(100% + 20px)',
                                lef: '0',
                            }}
                        />
                        <SlDislike size={21} color="#606060" />
                    </button>
                    <span className={clsx(styles.count)}>1</span>
                    <Link to="/post/22" className={clsx(styles.btn)}>
                        <Tooltip
                            content={'Bình luận'}
                            customStyle={{
                                whiteSpace: 'nowrap',
                                top: 'calc(100% + 20px)',
                                lef: '0',
                            }}
                        />
                        <SlBubbles size={21} color="#606060" />
                    </Link>
                    <span className={clsx(styles.count)}>2</span>
                </div>
            </div>
            <div
                ref={elementRef}
                className={clsx(styles.dotMenu, { [styles.active]: isShow })}
                onClick={() => setShow(!isShow)}
            >
                <DotMenu />
                {isShow && <MenuFixed isDisableScroll={isShow} menulist={menuList} />}
            </div>
        </div>
    );
}

export default Card;
