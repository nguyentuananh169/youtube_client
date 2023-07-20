import clsx from 'clsx';
import useStore from '../../../../../hook/useStore';
import Notification from './Notification';
import UserMenu from '../../../../../components/UserMenu';
import VideoCall from './VideoCall';
import styles from './Actions.module.css';
import Login from './Login';
function Actions() {
    const [state] = useStore();
    const { isLogin } = state;
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
