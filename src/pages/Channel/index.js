import clsx from 'clsx';
import styles from './Channel.module.css';
import Banner from './components/Banner';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Main from './components/Main';
import userApi from '../../api/userApi';
import HeaderLoading from './components/Header/Loading';
import BannerLoading from './components/Banner/Loading';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
function Channel() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            const fetchUserById = async () => {
                setIsLoading(true);
                const formData = {
                    _type: 'get_by_id',
                    _id: id,
                };
                const response = await userApi.statistical(formData);
                if (response[0].user_id) {
                    setUser(response[0]);
                    setIsLoading(false);
                } else {
                    navigate('/');
                }
            };
            fetchUserById();
        }
    }, [id]);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.banner)}>
                {isLoading ? <BannerLoading /> : <Banner user={user} setUser={setUser} />}
            </div>
            <div className={clsx(styles.header)}>
                {isLoading ? <HeaderLoading /> : <Header user={user} />}
            </div>
            <div className={clsx(styles.tabs)}>
                <Tabs isLoading={isLoading} />
            </div>
            <div className={clsx(styles.main)}>
                <Main user={user} />
            </div>
        </div>
    );
}

export default Channel;
