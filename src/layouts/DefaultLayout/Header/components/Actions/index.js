import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Notification from './Notification';
import UserMenu from '../../../../../components/UserMenu';
import VideoCall from './VideoCall';
import styles from './Actions.module.css';
import Login from './Login';
function Actions() {
    const isLogin = useSelector((state) => state.auth.isLogin);
    return (
        <div className={clsx(styles.wrapper)}>
            {isLogin ? (
                <>
                    <VideoCall />
                    <Notification />
                    <UserMenu />
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default Actions;
