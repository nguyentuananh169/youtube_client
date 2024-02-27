import { useEffect, useState } from 'react';
import userApi from '../../../../api/userApi';
import Channel from './Channel';
import Comments from './Comments';
import Subscribers from './Subscribers';
function ChannelAnalytics() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUserStatistical = async () => {
            setIsLoading(true);
            const formData = {
                _type: 'get_by_token',
            };
            const response = await userApi.statistical(formData);
            setUser(response[0]);
            setIsLoading(false);
        };
        fetchUserStatistical();
    }, []);
    return (
        <>
            <Channel user={user} isLoading={isLoading} />
            <Comments />
            <Subscribers />
        </>
    );
}

export default ChannelAnalytics;
