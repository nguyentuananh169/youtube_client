import { useNavigate } from 'react-router-dom';
import useStore from '../../hook/useStore';
import { changeUserInfo } from '../../store/actions';
import { useEffect } from 'react';
function Logout() {
    const [, dispatch] = useStore();
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
