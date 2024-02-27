import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeUserInfo } from '../../store/actions/auth';
function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const handleLogOut = () => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            dispatch(changeUserInfo(null));
            navigate('/', { replace: true });
        };
        handleLogOut();
    }, []);
    return <></>;
}

export default Logout;
