import { ArrowDown, ArrowUp, ExternalLink } from 'react-feather';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import subscriptionApi from '../../../../../../../api/subscriptionApi';
import { addToastMessage } from '../../../../../../../store/actions/toastMessage';
import NoAvatar from '../../../../../../../components/NoAvatar';
import timeConversion from '../../../../../../../hook/useTimeConversion';
import LoadingHasMore from '../../../../../../../components/LoadingHasMore';
import styles from './Item.module.css';
function Item({ item = {}, isHeader, params }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(item.is_subscribed);
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    let timeObject = {};
    if (!isHeader) {
        timeObject = timeConversion(item.subscribe_created_at, 'object');
    }
    const handleSubscribe = async () => {
        if (isHeader || isLoading) {
            return;
        }
        setIsLoading(true);
        const data = new FormData();
        data.append('_id', item.user_id);
        const response = await subscriptionApi.subscribe(data);
        setIsLoading(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(addToastMessage('success', 'Thành công', response[0].message));
        setCount(count + 1);
        setIsSubscribed(true);
    };
    const handleUnsubscribe = async () => {
        if (isHeader || isLoading) {
            return;
        }
        setIsLoading(true);
        const data = new FormData();
        data.append('_id', item.user_id);
        const response = await subscriptionApi.unsubscribe(data);
        setIsLoading(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        dispatch(addToastMessage('success', 'Thành công', response[0].message));
        setIsSubscribed(false);
        setCount(count - 1);
    };
    return (
        <>
            {isHeader ? (
                <div className={clsx(styles.item, styles.header)}>
                    <div className={clsx(styles.main)}>
                        <div className={clsx(styles.channelName)}>
                            <span>Kênh</span>
                        </div>
                        <div className={clsx(styles.subscribeDate)}>
                            <span>Ngày đăng ký</span>
                            {params.orderType === 'DESC' ? (
                                <ArrowDown size={15} strokeWidth="1" />
                            ) : (
                                <ArrowUp size={15} strokeWidth="1" />
                            )}
                        </div>
                        <div className={clsx(styles.totalSubscribers)}>
                            <span>Số người đăng ký</span>
                        </div>
                    </div>
                    <div className={clsx(styles.action)}>
                        <span>Hành động</span>
                    </div>
                </div>
            ) : (
                <div className={clsx(styles.itemContainer)}>
                    <div className={clsx(styles.item)}>
                        <div className={clsx(styles.main)}>
                            <div className={clsx(styles.channelName)}>
                                <Link to={`/channel/${item.user_id}/home`}></Link>
                                {item.user_avatar ? (
                                    <img src={item.user_avatar} />
                                ) : (
                                    <NoAvatar
                                        userName={item.user_name}
                                        customStyles={{
                                            width: '36px',
                                            height: '36px',
                                            fontSize: '1.5rem',
                                        }}
                                    />
                                )}
                                <span className={clsx(styles.name)}>{item.user_name}</span>
                            </div>
                            <div className={clsx(styles.subscribeDate)}>
                                <span>{`${timeObject.date} thg ${timeObject.month}, ${timeObject.year}`}</span>
                            </div>
                            <div className={clsx(styles.totalSubscribers)}>
                                <span>{`${+item.user_total_subscribe + count} người đăng ký`}</span>
                            </div>
                        </div>
                        <div className={clsx(styles.action)}>
                            {isLoading && (
                                <LoadingHasMore customStyle={{ justifyContent: 'flex-end' }} />
                            )}
                            {isSubscribed && !isLoading && (
                                <span className={styles.unsubscribe} onClick={handleUnsubscribe}>
                                    Hủy đăng ký
                                </span>
                            )}
                            {!isSubscribed && !isLoading && (
                                <span className={clsx(styles.subscribe)} onClick={handleSubscribe}>
                                    Đăng ký
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Item;
