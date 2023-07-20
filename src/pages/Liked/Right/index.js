import clsx from 'clsx';
import VideoCard from '../../../components/VideoCard';
import styles from './Right.module.css';
function Right() {
    return (
        <div className={clsx(styles.wrapper)}>
            {Array(10)
                .fill(0)
                .map((item, index) => (
                    <div key={index} className={clsx(styles.item)}>
                        <div className={clsx(styles.count)}>{index + 1}</div>
                        <div className={clsx(styles.card)}>
                            <VideoCard row width={'160px'} rowOwner hidenBtnIcon />
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Right;
