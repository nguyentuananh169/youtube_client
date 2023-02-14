import clsx from 'clsx';
import styles from './Actions.module.css';
import Notification from './Notification';
import User from './User';
import VideoCall from './VideoCall';
function Actions() {
    return (
        <div className={clsx(styles.wrapper)}>
            <VideoCall />
            <Notification />
            <User />
        </div>
    );
}

export default Actions;
