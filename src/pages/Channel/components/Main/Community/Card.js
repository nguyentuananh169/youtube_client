import { GrPrevious, GrNext } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import VideoCard from '../../../../../components/VideoCard';

import DotMenu from '../../../../../components/DotMenu';
import useClickOutSide from '../../../../../hook/useClickOutSide';
import MenuFixed from '../../../../../components/MenuFixed';
import NoAvatar from '../../../../../components/NoAvatar';
import useTimeConversion from '../../../../../hook/useTimeConversion';
import ConfirmationDialog from '../../../../../components/ConfirmationDialog';
import styles from './Community.module.css';
import Actions from './Actions';
import VideoCardError from '../../../../../components/VideoCardError';
function Card({ index, item, isActiveMenu = false, handleDelete = () => {} }) {
    const { pathname } = useLocation();
    const [elementRef, isShow, setShow] = useClickOutSide();
    const [indexImg, setIndexImg] = useState(0);
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const timeAgo = useTimeConversion(item.post_created_at, 'ago');
    const imgArr = item.post_img ? JSON.parse(item.post_img) : [];
    const handleNext = () => {
        if (item.post_type !== 'img') {
            return;
        }

        if (indexImg < imgArr.length - 1) {
            setIndexImg(indexImg + 1);
        }
    };
    const handlePrev = () => {
        if (item.post_type !== 'img') {
            return;
        }
        if (indexImg > 0) {
            setIndexImg(indexImg - 1);
        }
    };
    const handleClickDelete = () => {
        setShow(false);
        setIsShowDialog(true);
    };
    useEffect(() => {
        if (isConfirm) {
            handleDelete(index, item.post_id, item.post_img);
        }
    }, [isConfirm]);
    const menuList = [
        {
            icon: <RiDeleteBin6Line size={17} />,
            text: 'Xóa',
            onClick: handleClickDelete,
        },
    ];
    return (
        <div className={clsx(styles.item)}>
            {isShowDialog && (
                <ConfirmationDialog
                    title="Bạn có chắc muốn xóa bài viết ?"
                    content="Bài viết và các dữ liệu liên quan (bình luận, lượt thích,...) sẽ bị xóa vĩnh viễn và không thể khôi phục"
                    setIsConfirm={setIsConfirm}
                    setIsShowDialog={setIsShowDialog}
                />
            )}
            <div className={clsx(styles.img)}>
                {item.user_avatar ? (
                    <img src={item.user_avatar} />
                ) : (
                    <NoAvatar
                        userName={item.user_name}
                        customStyles={{ width: '40px', height: '40px' }}
                    />
                )}
            </div>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.info)}>
                    <Link to={`/channel/${item.user_id}/home`} className={clsx(styles.name)}>
                        {item.user_name}
                    </Link>
                    <span className={clsx(styles.time)}>{timeAgo}</span>
                </div>
                <div
                    className={clsx(styles.title, {
                        [styles.displayBlock]: pathname.startsWith('/post'),
                    })}
                    dangerouslySetInnerHTML={{ __html: item.post_content }}
                ></div>
                <Link
                    to={`/posts?id=${item.post_id}`}
                    className={clsx(styles.seeMore, {
                        [styles.hidden]: pathname.startsWith('/post'),
                    })}
                >
                    Xem thêm
                </Link>
                {item.post_type === 'video_id' && (
                    <div className={clsx(styles.videoCard)}>
                        {item.video_data?.video_id ? (
                            <VideoCard
                                item={item.video_data}
                                row
                                width="200px"
                                hidenDotMenu
                                rowOwner
                                showDes
                            />
                        ) : (
                            <VideoCardError row width="200px" />
                        )}
                    </div>
                )}
                {item.post_type === 'img' && (
                    <div className={clsx(styles.imgCard)}>
                        <div className={clsx(styles.aspectRatio)}>
                            <button
                                className={clsx(styles.btn, styles.prev, {
                                    [styles.hidden]: indexImg <= 0,
                                })}
                                onClick={handlePrev}
                            >
                                <GrPrevious size={17} />
                            </button>
                            <button
                                className={clsx(styles.btn, styles.next, {
                                    [styles.hidden]: indexImg >= imgArr.length - 1,
                                })}
                                onClick={handleNext}
                            >
                                <GrNext size={17} />
                            </button>
                            <img src={item.base_url_img + imgArr[indexImg]} />
                        </div>
                    </div>
                )}
                <Actions item={item} pathname={pathname} />
            </div>
            {isActiveMenu && !pathname.startsWith('/post') && (
                <div
                    ref={elementRef}
                    className={clsx(styles.dotMenu, { [styles.active]: isShow })}
                    onClick={() => setShow(!isShow)}
                >
                    <DotMenu />
                    {isShow && <MenuFixed isDisableScroll={isShow} menulist={menuList} />}
                </div>
            )}
        </div>
    );
}

export default Card;
