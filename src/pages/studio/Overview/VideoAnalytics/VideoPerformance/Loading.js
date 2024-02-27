import clsx from 'clsx';
import SkeletonLoading from '../../../../../components/SkeletonLoading';
import Card from '../../../components/Card';
import styles from './VideoPerformance.module.css';
function Loading() {
    return (
        <Card title={<SkeletonLoading height="20px" />}>
            <div className={clsx(styles.img)}>
                <SkeletonLoading />
            </div>
            <div className={clsx(styles.statistical)}>
                <SkeletonLoading height="81px" customStyles={{ marginTop: '20px' }} />
            </div>
            <div className={clsx(styles.linkBtn)}>
                <SkeletonLoading height="40px" customStyles={{ marginTop: '20px' }} />
            </div>
        </Card>
    );
}

export default Loading;
