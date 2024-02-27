import clsx from 'clsx';
import SkeletonLoading from '../../../../../components/SkeletonLoading';
import styles from './Comments.module.css';
function Loading() {
    return (
        <>
            <div className={clsx(styles.item)}>
                <div className={clsx(styles.avatar)}>
                    <SkeletonLoading circle />
                </div>
                <div className={clsx(styles.body)}>
                    <div className={clsx(styles.content)}>
                        <SkeletonLoading width="150px" height="20px" />
                    </div>
                    <div className={clsx(styles.text)}>
                        <SkeletonLoading height="20px" />
                    </div>
                </div>
                <div className={clsx(styles.thumbnail)}>
                    <div className={clsx(styles.aspectRatio)}>
                        <SkeletonLoading />
                    </div>
                </div>
            </div>
            <div className={clsx(styles.linkBtn)}>
                <SkeletonLoading width="50px" height="30px" customStyles={{ marginTop: '20px' }} />
            </div>
        </>
    );
}

export default Loading;
