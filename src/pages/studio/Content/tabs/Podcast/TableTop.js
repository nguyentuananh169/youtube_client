import clsx from 'clsx';
import Tooltip from '../components/Tooltip';
import styles from './Podcast.module.css';
function TableTop({ tab }) {
    return (
        <tr data-class="no-hover">
            <th className={clsx(styles.main)}>
                {tab === 'podcast' && (
                    <Tooltip
                        headingText={
                            'Tất cả các chương trình podcast của bạn sẽ xuất hiện tại đây.'
                        }
                    />
                )}
                <span>Podcast</span>
            </th>
            <th>
                {tab === 'podcast' && (
                    <Tooltip headingText="Người có thể thấy danh sách phát này." />
                )}
                <span>Chế độ hiển thị</span>
            </th>
            <th>
                {tab === 'podcast' && (
                    <Tooltip headingText={'Lần cập nhật mới nhất của danh sách phát này'} />
                )}
                <span>Ngày cập nhật gần đây nhất</span>
            </th>
            <th>
                {tab === 'podcast' && (
                    <Tooltip headingText={'Số lượng video trong danh sách phát này.'} />
                )}
                <span>Số lượng video</span>
            </th>
        </tr>
    );
}

export default TableTop;
