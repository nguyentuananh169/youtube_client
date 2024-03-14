import { BsCheckCircleFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Button from '../../../../../../components/Button';
import Tooltip from '../../../../../../components/Tooltip';
import NoAvatar from '../../../../../../components/NoAvatar';
import subscriptionApi from '../../../../../../api/subscriptionApi';
import { addSubscription, deleteSubscription } from '../../../../../../store/actions/subscription';
import { addToastMessage } from '../../../../../../store/actions/toastMessage';
import useNumberConversion from '../../../../../../hook/useNumberConversion';
import styles from './Owner.module.css';
function Owner({ id, avatar, name, subscriber, subscribed, isOfficial = false }) {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [isSubscribed, setIsSubscribed] = useState(subscribed);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsSubscribed(subscribed);
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
                    subscriber_id: auth.user.user_id,
                    user_avatar: avatar,
                    user_name: name,
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
    const formatSubscriber = useNumberConversion(subscriber, 'compression');
    return (
        <div className={clsx(styles.owner)}>
            <div className={clsx(styles.ownerInfo)}>
                <div className={clsx(styles.avatar)}>
                    {avatar ? (
                        <img src={avatar} />
                    ) : (
                        <div className={clsx(styles.noAvatar)}>
                            <NoAvatar userName={name} />
                        </div>
                    )}
                </div>
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.name)}>
                        <div className={clsx(styles.text)}>
                            <Tooltip
                                content={name}
                                customStyle={{
                                    bottom: 'calc(100% + 17px )',
                                    whiteSpace: 'nowrap',
                                }}
                            />
                            <Link to={`/channel/${id}/home`}>{name}</Link>
                        </div>

                        {isOfficial && (
                            <div className={clsx(styles.icon)}>
                                <Tooltip
                                    content="Đã xác minh"
                                    customStyle={{
                                        bottom: 'calc(100% + 20px )',
                                        left: '-37px',
                                        whiteSpace: 'nowrap',
                                    }}
                                />
                                <BsCheckCircleFill />
                            </div>
                        )}
                    </div>
                    <div className={clsx(styles.subscriber)}>{formatSubscriber} người đăng ký</div>
                </div>
            </div>

            {auth.isLogin && (
                <div className={clsx(styles.subscribeButton, { [styles.loading]: isLoading })}>
                    {id === auth.user?.user_id && (
                        <>
                            <Link
                                to={`/channel/${id}/home`}
                                className={clsx(styles.btn, styles.link)}
                            >
                                Truy cập kênh
                            </Link>
                        </>
                    )}
                    {id !== auth.user?.user_id && (
                        <>
                            {isSubscribed ? (
                                <Button
                                    onClick={handleClickUnsubscribe}
                                    className={clsx(styles.btn)}
                                >
                                    Hủy đăng ký
                                </Button>
                            ) : (
                                <Button
                                    className={clsx(styles.btn, styles.subscriber)}
                                    onClick={handleClickSubscribe}
                                >
                                    Đăng ký
                                </Button>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Owner;
