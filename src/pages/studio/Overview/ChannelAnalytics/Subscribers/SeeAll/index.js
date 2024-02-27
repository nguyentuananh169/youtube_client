import { useEffect, useState } from 'react';
import clsx from 'clsx';
import subscriptionApi from '../../../../../../api/subscriptionApi';
import Item from './Item';
import Actions from './Actions';
import styles from './SeeAll.module.css';

function SeeAll() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    const [subscriberList, setSubscriberList] = useState([]);
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        totalPage: 1,
        orderType: 'DESC',
    });
    const fetchSubscriber = async (pageValue = '', limitValue = '') => {
        setIsLoading(true);
        const formData = {
            _page: pageValue || params.page,
            _limit: limitValue || params.limit,
            _order_type: params.orderType,
        };
        const response = await subscriptionApi.showSubscriber(formData);
        setSubscriberList(response.list);
        setParams({
            ...params,
            page: response.page,
            limit: response.limit,
            totalPage: response.totalPage,
        });
        setIsLoading(false);
        setIsLoadingFirst(false);
    };
    useEffect(() => {
        fetchSubscriber();
    }, []);

    const handleChangeLimit = (value) => {
        if (!isLoading) {
            fetchSubscriber(1, value);
        }
    };
    const handleChangePage = (value) => {
        if (!isLoading) {
            fetchSubscriber(value, null);
        }
    };
    return (
        <>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.heading)}>
                    <Item isHeader params={params} />
                    {isLoading && <div className={clsx(styles.loading)}></div>}
                </div>
                <div className={clsx(styles.body)}>
                    {subscriberList.map((item) => (
                        <Item key={item.subscribe_id} item={item} />
                    ))}
                    {!isLoadingFirst && (
                        <Actions
                            page={params.page}
                            limit={params.limit}
                            totalPage={params.totalPage}
                            handleChangeLimit={handleChangeLimit}
                            handleChangePage={handleChangePage}
                        />
                    )}
                </div>
                <div className={clsx(styles.bottom)}></div>
            </div>
        </>
    );
}

export default SeeAll;
