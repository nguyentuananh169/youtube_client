import clsx from 'clsx';
import SkeLetonLoading from '../../../../../components/SkeletonLoading';
import styles from './ItemGroup.module.css';
import SkeletonLoading from '../../../../../components/SkeletonLoading';
function Loading() {
    return (
        <>
            <div className={clsx(styles.item)}>
                <div className={clsx(styles.body)}>
                    <div className={clsx(styles.avt)}>
                        <SkeLetonLoading circle />
                    </div>
                    <div className={clsx(styles.content)}>
                        <div className={clsx(styles.tag)}>
                            <SkeLetonLoading width="150px" height="20px" />
                        </div>
                        <div className={clsx(styles.text)}>
                            <SkeLetonLoading customStyles={{ maxWidth: '640px' }} height="40px" />
                        </div>
                    </div>
                </div>

                <div className={clsx(styles.videoThumbnail)}>
                    <div className={clsx(styles.poster)}>
                        <div className={clsx(styles.aspectRatio)}>
                            <SkeletonLoading />
                        </div>
                    </div>
                    <div className={clsx(styles.title)}>
                        <SkeLetonLoading height="50px" />
                    </div>
                </div>
                <div className={clsx(styles.viewComment)}>
                    <SkeLetonLoading width="40px" height="40px" />
                </div>
            </div>
        </>
    );
}

export default Loading;
