import { TfiArrowDown } from 'react-icons/tfi';

import clsx from 'clsx';
import Tooltip from '../components/Tooltip';
import styles from './Shorts.module.css';
import { RefreshCw } from 'react-feather';
function TableTop({ tab, handleRefresh }) {
    return (
        <tr data-class="no-hover">
            <th data-textalign="center">
                <input type="checkbox" className={clsx(styles.checkbox)} />
            </th>
            <th>
                {tab === 'shorts' && (
                    <Tooltip headingText="Cột này cho biết tất cả video ngắn được tải lên kênh của bạn" />
                )}
                <span>Video</span>
                <button className={clsx(styles.btnRefresh)} onClick={() => handleRefresh()}>
                    <RefreshCw size={15} strokeWidth={1} />
                </button>
            </th>
            <th>
                {tab === 'shorts' && (
                    <Tooltip
                        headingText="Người có thể thấy và chia sẻ video của bạn"
                        bodyText="Bạn có thể nhấp vào phần chế độ hiển thị của video để thay đổi"
                        bottomLink="#"
                    />
                )}
                <span>Chế độ hiển thị</span>
            </th>
            <th>
                {tab === 'shorts' && (
                    <Tooltip
                        headingText="Những hạn chế có ảnh hưởng đến video của bạn"
                        bodyText="Cột này cho bạn biết các quy định hạn chế về đối tượng khán giả hay khả năng kiếm tiền của video. Trong một số trường hợp, bạn có thể thực hiện các bước để loại bỏ hạn chế."
                        bottomLink="#"
                    />
                )}
                <span>Hạn chế</span>
            </th>
            <th className={clsx(styles.time)}>
                {tab === 'shorts' && (
                    <Tooltip
                        headingText="Ngày bạn tải video lên, lên lịch đăng video hoặc xuất bản video"
                        bodyText="Bạn sẽ thấy ngày tải lên nếu video của bạn ở chế độ riêng tư hoặc không công khai. Nếu video của bạn được lên lịch (xuất bản ở chế độ công khai hoặc dưới dạng buổi công chiếu), bạn sẽ thấy ngày lên lịch. Nếu video của bạn ở chế độ công khai, bạn sẽ thấy ngày xuất bản. Nếu video của bạn được tải lên qua nguồn cấp dữ liệu RSS, bạn sẽ thấy ngày phát hành ban đầu trong nguồn cấp đó."
                    />
                )}
                <span className={clsx(styles.text)}>Ngày</span>
                <TfiArrowDown size={12} color="#606060" />
            </th>

            <th>
                {tab === 'shorts' && (
                    <Tooltip
                        headingText="Số lần khán giả xem video của bạn"
                        bodyText="Số liệu này có thể tạm thời đóng băng hoặc dao động, đặc biệt là đối với các video mới tải lên"
                        bottomLink="#"
                    />
                )}
                <span>Số lượt xem</span>
            </th>
            <th>
                {tab === 'shorts' && (
                    <Tooltip
                        headingText="Số bình luận trên video của bạn"
                        bodyText="Bạn có thể đọc bình luận của người xem bằng cách nhấp vào số bình luận"
                    />
                )}
                <span>Số bình luận</span>
            </th>
            <th>
                {tab === 'shorts' && (
                    <Tooltip
                        headingText="Số lượt thích (so với lượt không thích) trên video của bạn"
                        bodyText="Xem chủ đề và dạng thức của các video có nhiều lượt thích nhất. Bạn có thể biết điều gì thu hút khán giả nhất."
                    />
                )}
                <span>Lượt thích (%)</span>
            </th>
        </tr>
    );
}

export default TableTop;
