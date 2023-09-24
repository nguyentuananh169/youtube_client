import { BsCheckCircleFill } from 'react-icons/bs';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Tooltip from '../../../../components/Tooltip';
import NoAvatar from '../../../../components/NoAvatar';
import useStore from '../../../../hook/useStore';
import subscriptionApi from '../../../../api/subscriptionApi';
import { addSubscription, addToastMessage, deleteSubscription } from '../../../../store/actions';
import useNumberConversion from '../../../../hook/useNumberConversion';
import styles from './Header.module.css';
import SelectFile from './SelectFile';
function Header({ user }) {
    const { id } = useParams();
    const [state, dispatch] = useStore();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (state.isLogin && state.user?.user_id && state.user?.user_id !== id) {
            const checkSubscribe = async () => {
                setIsLoading(true);
                const formData = {
                    _id: id,
                };
                const response = await subscriptionApi.checkSubscribe(formData);
                setIsSubscribed(response[0].is_subscribed);
                setIsLoading(false);
            };
            checkSubscribe();
        }
    }, [id]);
    const handleClickSubscribe = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const params = new FormData();
        params.append('_id', id);
        const response = await subscriptionApi.subscribe(params);
        if (response[0].error) {
            dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        } else {
            dispatch(addToastMessage('success', 'Thành công', response[0].message));
            dispatch(
                addSubscription({
                    subscriber_id: state.user.user_id,
                    user_avatar: user.user_avatar,
                    user_name: user.user_name,
                    user_id: id,
                }),
            );
            setIsSubscribed(!isSubscribed);
        }
        setIsLoading(false);
    };
    const handleClickUnsubscribe = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const params = new FormData();
        params.append('_id', id);
        const response = await subscriptionApi.unsubscribe(params);
        if (response[0].error) {
            dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        } else {
            dispatch(addToastMessage('success', 'Thành công', response[0].message));
            dispatch(deleteSubscription(id));
            setIsSubscribed(!isSubscribed);
        }
        setIsLoading(false);
    };
    const totalSubscribe = useNumberConversion(user.user_total_subscribe, 'compression');
    const totalVideo = useNumberConversion(user.user_total_video, 'commas');
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.img)}>
                    {state.isLogin && state.user?.user_id && state.user?.user_id === id && (
                        <SelectFile />
                    )}
                    {user.user_avatar || state.user.user_avatar ? (
                        <img
                            src={
                                state.user?.user_id === id
                                    ? state.user.user_avatar
                                    : user.user_avatar
                            }
                        />
                    ) : (
                        <NoAvatar
                            userName={user.user_name || ''}
                            customStyles={{ fontSize: '80px' }}
                        />
                    )}
                </div>
                <div className={clsx(styles.owner)}>
                    <div className={clsx(styles.containerName)}>
                        <div className={clsx(styles.name)}>
                            <strong>
                                {user.user_name}
                                <Tooltip
                                    content={user.user_name}
                                    customStyle={{
                                        left: '50%',
                                        bottom: '100%',
                                        transform: 'translate(-50%, -50%)',
                                        whiteSpace: 'nowrap',
                                    }}
                                />
                            </strong>
                            <strong>
                                <BsCheckCircleFill size={12} />
                                <Tooltip
                                    content="Đã xác minh"
                                    customStyle={{
                                        left: '50%',
                                        bottom: '100%',
                                        transform: 'translate(-50%, -50%)',
                                        whiteSpace: 'nowrap',
                                    }}
                                />
                            </strong>
                        </div>
                        <div
                            className={clsx(styles.containerBtn, {
                                [styles.loading]: isLoading && state.user?.user_id !== id,
                            })}
                        >
                            {state.isLogin &&
                                (user.user_id === state.user?.user_id ? (
                                    <>
                                        <Link to="/studio/editing" className={clsx(styles.btn)}>
                                            Tùy chỉnh kênh
                                        </Link>
                                        <Link
                                            to="/studio/videos/upload"
                                            className={clsx(styles.btn)}
                                        >
                                            Quản lý video
                                        </Link>
                                    </>
                                ) : isSubscribed ? (
                                    <button
                                        className={clsx(styles.btn)}
                                        onClick={handleClickUnsubscribe}
                                    >
                                        Hủy đăng ký
                                    </button>
                                ) : (
                                    <button
                                        className={clsx(styles.btn, styles.subscriber)}
                                        onClick={handleClickSubscribe}
                                    >
                                        Đăng ký
                                    </button>
                                ))}
                        </div>
                    </div>
                    <p className={clsx(styles.meta)}>
                        <strong>{user.user_tag}</strong>
                        {user.user_total_subscribe > 0 && (
                            <span>{totalSubscribe} người đăng ký</span>
                        )}
                        {user.user_total_video > 0 && <span>{totalVideo} video</span>}
                    </p>
                    <p className={clsx(styles.about, { [styles.noDes]: !user.user_des })}>
                        <Link to={`/channel/${id}/about`}>
                            {user.user_des ? (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: user.user_des,
                                    }}
                                ></span>
                            ) : (
                                <span className={clsx(styles.noDes)}>
                                    Tìm hiểu thêm về kênh này
                                </span>
                            )}
                        </Link>

                        <MdArrowForwardIos size={18} />
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Header;
