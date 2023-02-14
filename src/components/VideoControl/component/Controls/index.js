import clsx from 'clsx';

import styles from './Controls.module.css';
import ControlLeft from './ControlLeft';
import ControlRight from './ControlRight';
function Controls({ isPlay, handlePlayVideo }) {
    return (
        <div className={clsx(styles.controls)}>
            <div className={clsx(styles.controlsLeft)}>
                <ControlLeft isPlay={isPlay} handlePlayVideo={handlePlayVideo} />
            </div>
            <div className={clsx(styles.controlsRight)}>
                <ControlRight />
            </div>
        </div>
    );
}

export default Controls;
