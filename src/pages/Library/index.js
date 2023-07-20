import clsx from 'clsx';
import styles from './Library.module.css';
import Contents from './Contents';
import ChannelInfo from './ChannelInfo';
function Library() {
    return (
        <div className={clsx(styles.wrapper)}>
            <Contents />
            <ChannelInfo />
        </div>
    );
}

export default Library;
