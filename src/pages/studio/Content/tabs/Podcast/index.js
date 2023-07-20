import clsx from 'clsx';
import NoData from '../../../components/NoData';
import Table from '../components/Table';
import imgv3 from '../../../../../assets/img/no_content_v3.png';
import styles from './Podcast.module.css';
import TableTop from './TableTop';
function Podcast({ tab }) {
    return (
        <div className={clsx(styles.wrapper)}>
            {/* <Table>
                <TableTop tab={tab} />
            </Table> */}
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
