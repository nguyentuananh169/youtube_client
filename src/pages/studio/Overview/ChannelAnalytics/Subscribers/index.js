import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Card from '../../../components/Card';
import Item from './Item';
import subscriptionApi from '../../../../../api/subscriptionApi';
import Loading from './Loading';
import Modal from '../../../components/Modal';
import SeeAll from './SeeAll';
import styles from './Subscribers.module.css';
function Subscribers() {
    const [isLoading, setLoading] = useState(true);
    const [isShowModal, setShowModal] = useState(false);
    const [subscriberList, setSubscriberList] = useState([]);
    useEffect(() => {
        const fetchSubscribers = async () => {
            setLoading(true);
            const formData = {
                _limit: 3,
            };
            const response = await subscriptionApi.showSubscriber(formData);
            setSubscriberList(response.list);
            setLoading(false);
        };
        fetchSubscribers();
    }, []);
    const hanleSetModal = (e) => {
        e.preventDefault();
        setShowModal(!isShowModal);
    };
    return (
        <div className={clsx(styles.wrapper)}>
            {isShowModal && (
                <Modal
                    title="Số người đăng ký"
                    handleCloseModal={hanleSetModal}
                    customStyle={{ maxWidth: '960px', maxHeight: '636px' }}
                >
                    <SeeAll />
                </Modal>
            )}
            {isLoading && (
                <Card title={'Người đăng ký gần đây'}>
                    <Loading />
                </Card>
            )}
            {!isLoading && subscriberList.length > 0 && (
                <Card title={'Người đăng ký gần đây'}>
                    {subscriberList.map((item) => (
                        <Item key={item.subscribe_id} item={item} />
                    ))}
                    <div className={clsx(styles.btn)}>
                        <Link onClick={hanleSetModal}>Xem tất cả</Link>
                    </div>
                </Card>
            )}
        </div>
    );
}

export default Subscribers;
