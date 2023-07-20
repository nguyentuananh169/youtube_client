import clsx from 'clsx';
import Tooltip from '../components/Tooltip';
import styles from './Live.module.css';
function TableTop({ tab }) {
    return (
        <tr data-class="no-hover">
            <th data-textalign="center" className={clsx(styles.checkbox)}>
                <input type="checkbox" />
            </th>
            <th>
                {tab === 'live' && (
                    <Tooltip
                        headingText={'Cột này hiển thị tất cả các sự kiện trực tiếp của kênh'}
                    />
                )}
                <span>Sự kiện trực tiếp</span>
            </th>
            <th>
                <span>Loại</span>
            </th>
            <th>
                {tab === 'live' && (
                    <Tooltip
                        headingText="Người có thể thấy và chia sẻ video của bạn"
                        bodyText="Bạn có thể nhấp vào phần chế độ hiển thị của video để thay đổi"
                        bottomLink="#"
                    />
                )}
                <span>Chế độ hiển thị</span>
            </th>
            <th>
                <span>Hạn chế</span>
            </th>
            <th>
                {tab === 'live' && (
                    <Tooltip
                        headingText={'Ngày bạn lên lịch, bắt đầu hoặc kết thúc sự kiện trực tiếp'}
                        bodyText={
                            'Bạn sẽ thấy thời gian bắt đầu được lên lịch của sự kiện trực tiếp sắp diễn ra và thời gian kết thúc của sự kiện trực tiếp đã kết thúc. Đối với sự kiện trực tiếp đang diễn ra, bạn sẽ thấy thời gian bắt đầu.'
                        }
                    />
                )}
                <span>Ngày</span>
            </th>
            <th>
                <span>Số lượt xem</span>
            </th>
            <th>
                {tab === 'live' && <Tooltip bodyText={'Số người đang xem trực tiếp'} />}
                <span>Số người xem trực tiếp</span>
            </th>
            <th>
                {tab === 'live' && (
                    <Tooltip
                        headingText={'Số bình luận trên video của bạn'}
                        bodyText={
                            'Bạn có thể đọc bình luận của người xem bằng cách nhấp vào số bình luận'
                        }
                    />
                )}
                <span>Số bình luận</span>
            </th>
        </tr>
    );
}

export default TableTop;
