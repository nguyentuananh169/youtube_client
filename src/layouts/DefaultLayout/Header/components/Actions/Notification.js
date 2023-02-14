import clsx from 'clsx';
import { SlBell } from 'react-icons/sl';
import Tooltip from '../../../../../components/Tooltip';
import styles from './Actions.module.css';
function Notification() {
    return (
        <div className={clsx(styles.notification, styles.btn)}>
            <SlBell />
            <div className={clsx(styles.tooltip)}>
                <Tooltip content="Thông báo" />
            </div>
        </div>
    );
}

export default Notification;
