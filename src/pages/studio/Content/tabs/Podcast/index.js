import clsx from 'clsx';
import NoData from '../../../components/NoData';
import imgv3 from '../../../../../assets/img/no_content_v3.png';
import styles from './Podcast.module.css';
function Podcast({ tab }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <NoData
                img={imgv3}
                bodyText="Tạo podcast mới hoặc đặt một danh sách phát hiện có làm podcast."
                bottomText="PODCAST mới"
                isBottomBtn
            />
        </div>
    );
}

export default Podcast;
