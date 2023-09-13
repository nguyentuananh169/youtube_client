import { BsPin, BsCheckCircleFill, BsFlag } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import NoAvatar from '../../../../../../components/NoAvatar';
import Form from '../Form';
import useStore from '../../../../../../hook/useStore';
import commentApi from '../../../../../../api/commentApi';
import useClickOutSide from '../../../../../../hook/useClickOutSide';
import DotMenu from '../../../../../../components/DotMenu';
import MenuFixed from '../../../../../../components/MenuFixed';
import styles from './Item.module.css';
import LoadingHasMore from '../../../../../../components/LoadingHasMore';
import { addToastMessage } from '../../../../../../store/actions';
import Actions from './Actions';
import useTimeConversion from '../../../../../../hook/useTimeConversion';
function Item({
    isLv2 = false,
    item = {},
    index,
    ownerId,
    ownerName,
    ownerAvatar,
    handleAddSuccess,
    handleDeleteCommentSuccess,
    handleUpdateCommentSuccess,
    handleResetComments = () => {},
    commentRef,
}) {
    const [state, dispatch] = useStore();

    const [isShowForm, setIsShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [elementRef, isShow, setShow] = useClickOutSide();
    const convertTime = useTimeConversion;
    const handleAddCommentSuccess = (data) => {
        setIsShowForm(false);
        handleAddSuccess(data);
    };

    const hanldeDelete = async () => {
        const text = isLv2
            ? 'Bạn có chắc muốn xóa vĩnh viễn bình luận này ?'
            : 'Bạn có chắc muốn xóa vĩnh viễn bình luận và phản hồi này ?';
        if (window.confirm(text)) {
            setIsLoading(true);
            const params = {
                _cmt_id: item.cmt_id,
                _cmt_parent_id: item.cmt_parent_id,
            };
            const response = await commentApi.delete(params);
            setIsLoading(false);
            if (response[0].error) {
                return dispatch(addToastMessage('error', 'Thất bại', response[0].message));
            }
            handleDeleteCommentSuccess(index);
        }
    };
    const handleScrollToElementComments = (boolean) => {
        if (commentRef?.current && boolean) {
            const scrollY = commentRef.current.offsetTop;
            window.scrollTo(0, scrollY);
        }
    };
    const handlePin = async () => {
        const isPin = item.cmt_pin;
        const params = new FormData();
        params.append('_type', isPin ? 'unpin' : 'pin');
        params.append('_cmt_id', item.cmt_id);
        const response = await commentApi.pin(params);
        if (!response[0].error) {
            setShow(false);
            handleScrollToElementComments(!isPin);
            handleResetComments();
        }
    };

    const dataMenuFixed = [
        {
            icon: <BsPin />,
            text: item.cmt_pin ? 'Bỏ ghim' : 'Ghim',
            isHidden: ownerId !== state.user?.user_id || isLv2,
            onClick: handlePin,
        },
        {
            icon: <CiEdit />,
            text: 'Chỉnh sửa',
            isHidden: state.user?.user_id !== item.user_id,
            onClick: () => {
                setIsEdit(true);
                setShow(false);
            },
        },
        {
            icon: <RiDeleteBin6Line />,
            text: 'Xóa',
            isHidden: state.user?.user_id !== item.user_id,
            onClick: hanldeDelete,
        },
        {
            icon: <BsFlag />,
            text: 'Báo cáo vi phạm',
            isHidden: state.user?.user_id === item.user_id,
        },
    ];
    const handleEdit = async (value) => {
        setIsLoading(true);
        const params = new FormData();
        params.append('_video_id', item.video_id);
        params.append('_cmt_id', item.cmt_id);
        params.append('_content', value);
        const response = await commentApi.update(params);
        setIsLoading(false);
        setIsEdit(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất bại', 'Có lỗi xảy ra'));
        }
        handleUpdateCommentSuccess(index, response[0].content, response[0].timestamp);
    };
    return (
        <>
            <div className={clsx(styles.itemList, { [styles.itemLv2]: isLv2 })}>
                <div className={clsx(styles.avatar)}>
                    <Link to={`/channel/${item.user_id}/home`}></Link>
                    {item.user_avatar ? (
                        <img src={item.user_avatar} alt="" />
                    ) : (
                        <div className={clsx(styles.noAvatar)}>
                            <NoAvatar userName={item.user_name} />
                        </div>
                    )}
                </div>
                <div className={clsx(styles.info)}>
                    {!isLv2 && item.cmt_pin && (
                        <div className={clsx(styles.pin)}>
                            <BsPin />
                            <span>{ownerName} đã ghim</span>
                        </div>
                    )}
                    <div className={clsx(styles.name)}>
                        <Link
                            to={`/channel/${item.user_id}/home`}
                            className={clsx({ [styles.owner]: ownerId === item.user_id })}
                        >
                            {item.user_tag} <BsCheckCircleFill />
                        </Link>
                        <span>
                            {item.cmt_edited
                                ? `${convertTime(item.cmt_updated_at, 'ago')} (đã chỉnh sửa)`
                                : convertTime(item.cmt_created_at, 'ago')}
                        </span>
                    </div>
                    <div className={clsx(styles.content)}>
                        {isEdit ? (
                            <Form
                                isFocusTextare
                                lv2={isLv2}
                                initValueForm={item.cmt_content}
                                isHiddenAvatar
                                handleEdit={handleEdit}
                                handleCloseForm={() => setIsEdit(false)}
                                customStyles={{ marginTop: 0 }}
                            />
                        ) : (
                            <span>{item.cmt_content}</span>
                        )}
                    </div>
                    <Actions
                        item={item}
                        ownerId={ownerId}
                        ownerAvatar={ownerAvatar}
                        ownerName={ownerName}
                        isShowForm={isShowForm}
                        setIsShowForm={setIsShowForm}
                    />
                    {isShowForm && !isLoading && !isEdit && (
                        <Form
                            isFocusTextare
                            lv2
                            parentId={item.cmt_parent_id > 0 ? item.cmt_parent_id : item.cmt_id}
                            handleAddCommentSuccess={handleAddCommentSuccess}
                        />
                    )}
                </div>

                {state.isLogin && !isLoading && !isEdit && (
                    <div
                        ref={elementRef}
                        className={clsx(styles.dotMenu, { [styles.active]: isShow })}
                        onClick={() => setShow(!isShow)}
                    >
                        <DotMenu />
                        {isShow && (
                            <MenuFixed
                                isDisableScroll
                                menulist={dataMenuFixed}
                                customStyle={{ minWidth: '155px' }}
                            />
                        )}
                    </div>
                )}
            </div>
            {isLoading && <LoadingHasMore />}
        </>
    );
}

export default Item;
