import { BsDot } from 'react-icons/bs';
import { ExternalLink } from 'react-feather';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Actions from '../Actions';
import useTimeConversion from '../../../../../hook/useTimeConversion';
import NoAvatar from '../../../../../components/NoAvatar';
import Form from '../Form';

import styles from './ItemGroup.module.css';
function Item({
    count = 0,
    lv2 = null,
    item,
    index,
    handleReplyCommentSuccess,
    handleUpdateCommentSuccess,
    hanldeDeleteComment,
    handleSetShowReply = () => {},
}) {
    const [isShowForm, setIsShowForm] = useState(false);
    const [isShowFormUpdate, setIsShowFormUpdate] = useState(false);
    const timeConvert = useTimeConversion;
    const isToggleNavbar2 = useSelector((state) => state.toggleNavbar.isToggleNavbar2);
    const handleSetShowForm = () => {
        setIsShowForm(!isShowForm);
    };
    const handleSetShowFormUpdate = () => {
        setIsShowFormUpdate(!isShowFormUpdate);
    };
    return (
        <>
            <div
                className={clsx(styles.item, {
                    [styles.lv2]: lv2,
                    [styles.toggleNavbar]: isToggleNavbar2,
                })}
            >
                <div className={clsx(styles.body)}>
                    {isShowFormUpdate ? (
                        <Form
                            isUpdate
                            defaultValue
                            item={item}
                            index={index}
                            handleSetShowForm={handleSetShowFormUpdate}
                            handleReplyCommentSuccess={handleReplyCommentSuccess}
                            handleUpdateCommentSuccess={handleUpdateCommentSuccess}
                        />
                    ) : (
                        <>
                            <div className={clsx(styles.avt)}>
                                {item.user_avatar ? (
                                    <img src={item.user_avatar} />
                                ) : (
                                    <NoAvatar userName={item.user_name} />
                                )}
                            </div>
                            <div className={clsx(styles.content)}>
                                <div className={clsx(styles.tag)}>
                                    <span>{item.user_tag}</span>
                                    <BsDot size={20} color="#606060" />
                                    <span>
                                        {timeConvert(
                                            item.cmt_edited
                                                ? item.cmt_updated_at
                                                : item.cmt_created_at,
                                            'ago',
                                        )}
                                    </span>
                                    {item.cmt_edited && (
                                        <span className={clsx(styles.small)}>(Đã chỉnh sửa)</span>
                                    )}
                                </div>
                                <div className={clsx(styles.text)}>{item.cmt_content}</div>
                                <Actions
                                    count={count}
                                    lv2={lv2}
                                    item={item}
                                    index={index}
                                    handleSetShowForm={handleSetShowForm}
                                    handleSetShowFormUpdate={handleSetShowFormUpdate}
                                    hanldeDeleteComment={hanldeDeleteComment}
                                    isShowForm={isShowForm}
                                    handleSetShowReply={
                                        +item.count_reply + count > 0
                                            ? handleSetShowReply
                                            : () => {}
                                    }
                                />
                            </div>
                        </>
                    )}
                </div>
                {!lv2 && (
                    <>
                        <div className={clsx(styles.videoThumbnail)}>
                            <Link
                                to={`/watch?category=${item.category_id}&id=${item.video_id}`}
                            ></Link>
                            <div className={clsx(styles.poster)}>
                                <div className={clsx(styles.aspectRatio)}>
                                    <img src={item.video_poster} />
                                </div>
                            </div>
                            <div className={clsx(styles.title)}>{item.video_title}</div>
                        </div>
                        <div className={clsx(styles.viewComment)}>
                            <Link
                                target="_blank"
                                to={`/watch?category=${item.category_id}&id=${item.video_id}`}
                            ></Link>
                            <ExternalLink size={20} strokeWidth={1} color="#909090" />
                        </div>
                    </>
                )}
            </div>
            {isShowForm && (
                <Form
                    item={item}
                    index={index}
                    handleSetShowForm={handleSetShowForm}
                    handleReplyCommentSuccess={handleReplyCommentSuccess}
                />
            )}
        </>
    );
}

export default Item;
