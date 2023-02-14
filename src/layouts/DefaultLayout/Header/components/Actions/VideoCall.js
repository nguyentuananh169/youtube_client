import clsx from 'clsx';
import { TfiVideoCamera } from 'react-icons/tfi';
import Tooltip from '../../../../../components/Tooltip';
import styles from './Actions.module.css';
function VideoCall() {
    return (
        <div className={clsx(styles.btn)}>
            <TfiVideoCamera />
            <div className={clsx(styles.tooltip)}>
                <Tooltip content="Tạo" />
            </div>
        </div>
    );
}

export default VideoCall;
