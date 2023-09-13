import clsx from 'clsx';
import Tooltip from '../components/Tooltip';
import styles from './PlayList.module.css';
function TableTop({ tab }) {
    return (
        <tr data-class="no-hover">
            <th className={clsx(styles.main)}>
                {tab === 'playlist' && (
                    <Tooltip
                        headingText={'Mọi danh sách phát trên kênh của bạn sẽ xuất hiện ở đây.'}
                    />
                )}
                <span>Danh sách phát</span>
            </th>
            <th>
                {tab === 'playlist' && (
                    <Tooltip headingText="Người có thể thấy danh sách phát này." />
                )}
                <span>Chế độ hiển thị</span>
            </th>
            <th>
                {tab === 'playlist' && (
                    <Tooltip headingText={'Lần cập nhật mới nhất của danh sách phát này'} />
                )}
                <span>Ngày cập nhật gần đây nhất</span>
            </th>
            <th>
                {tab === 'playlist' && (
                    <Tooltip headingText={'Số lượng video trong danh sách phát này.'} />
                )}
                <span>Số lượng video</span>
            </th>
        </tr>
    );
}

export default TableTop;
