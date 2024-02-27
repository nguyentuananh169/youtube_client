import clsx from 'clsx';
import TitlePage from '../components/TitlePage';
import ChannelAnalytics from './ChannelAnalytics';
import Wellcome from './Wellcome';
import Bottom from './Bottom';
import VideoAnalytics from './VideoAnalytics';
import styles from './OverView.module.css';
function OverView() {
    return (
        <div className={clsx(styles.wrapper)}>
            <TitlePage text={'Trang tổng quan của kênh'} />
            <div className={clsx(styles.body)}>
                <div className={clsx(styles.card)}>
                    <VideoAnalytics />
                </div>
                <div className={clsx(styles.card)}>
                    <ChannelAnalytics />
                </div>
                <div className={clsx(styles.card)}>
                    <Wellcome />
                </div>
            </div>
            <Bottom />
        </div>
    );
}

export default OverView;
