import clsx from 'clsx';
import SkeletonLoading from '../../../components/SkeletonLoading';
import styles from './Channels.module.css';
function Loading() {
    return (
        <>
            <div className={clsx(styles.heading)}>
                <SkeletonLoading width="200px" height="30px" />
            </div>
            {Array(3)
                .fill(0)
                .map((item, index) => (
                    <div key={index} className={clsx(styles.body)}>
                        <div className={clsx(styles.channel)}>
                            <div className={clsx(styles.img)}>
                                <SkeletonLoading
                                    width="136px"
                                    height="136px"
                                    circle
                                    customStyles={{ margin: '0 auto' }}
                                />
                            </div>
                            <div className={clsx(styles.info)}>
                                <div className={clsx(styles.owner)}>
                                    <div className={clsx(styles.name)}>
                                        <span className={clsx(styles.text)}>
                                            <SkeletonLoading width="200px" height="20px" />
                                        </span>
                                    </div>
                                    <div className={clsx(styles.official)}>
                                        <SkeletonLoading width="13px" height="13px" circle />
                                    </div>
                                </div>
                                <div className={clsx(styles.subscriber)}>
                                    <SkeletonLoading width="180px" height="20px" />
                                </div>
                                <div className={clsx(styles.des)}>
                                    <SkeletonLoading height="30px" />
                                </div>
                            </div>
                        </div>
                        <div className={clsx(styles.actions)}>
                            <SkeletonLoading width="136px" height="36px" />
                        </div>
                    </div>
                ))}
        </>
    );
}

export default Loading;
