import clsx from 'clsx';
import VideoCard from '../../../components/VideoCard';
import VideoCardLoading from '../../../components/VideoCard/Loading';
import styles from './Right.module.css';
function Right({ isLoading, indexVideo, videoList }) {
    return (
        <div className={clsx(styles.wrapper)}>
            {isLoading &&
                Array(5)
                    .fill(0)
                    .map((item, index) => (
                        <VideoCardLoading
                            key={index}
                            row
                            width={'160px'}
                            rowOwner
                            hidenBtnIcon
                            hidenDotMenu
                        />
                    ))}
            {!isLoading &&
                videoList.length > 0 &&
                videoList.map((item, index) => (
                    <div
                        key={item.vote_id}
                        className={clsx(styles.item, { [styles.active]: index === indexVideo })}
                    >
                        <div className={clsx(styles.count)}>{index + 1}</div>
                        <div className={clsx(styles.card)}>
                            <VideoCard
                                item={item}
                                row
                                width={'160px'}
                                rowOwner
                                hidenBtnIcon
                                hidenDotMenu
                            />
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Right;
