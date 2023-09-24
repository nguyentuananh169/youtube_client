import { BsCheckCircleFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Button from '../../../../../../components/Button';
import Tooltip from '../../../../../../components/Tooltip';
import useStore from '../../../../../../hook/useStore';
import NoAvatar from '../../../../../../components/NoAvatar';
import subscriptionApi from '../../../../../../api/subscriptionApi';
import {
    addSubscription,
    addToastMessage,
    deleteSubscription,
} from '../../../../../../store/actions';
import useNumberConversion from '../../../../../../hook/useNumberConversion';
import styles from './Owner.module.css';
function Owner({ id, avatar, name, subscriber, isOfficial = false }) {
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

            {state.isLogin && (
                <div className={clsx(styles.subscribeButton, { [styles.loading]: isLoading })}>
                    {id === state.user?.user_id ? (
                        <>
                            <Link
                                to={`/channel/${id}/home`}
                                className={clsx(styles.btn, styles.link)}
                            >
                                Truy cập kênh
                            </Link>
                        </>
                    ) : isSubscribed ? (
                        <Button onClick={handleClickUnsubscribe} className={clsx(styles.btn)}>
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
                </div>
            )}
        </div>
    );
}

export default Owner;
