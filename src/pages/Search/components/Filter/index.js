import { BsFilter } from 'react-icons/bs';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Tooltip from '../../../../components/Tooltip';
import styles from './Filter.module.css';
import { Link } from 'react-router-dom';
function Filter() {
    const filterList = [
        [
            {
                isHeading: true,
                text: 'Ngày tải lên',
            },
            {
                text: 'Một giờ qua',
            },
            {
                text: 'Hôm nay',
            },
            {
                text: 'Tuần này',
            },
            {
                text: 'Tháng này',
            },
            {
                text: 'Năm nay',
            },
        ],
        [
            {
                isHeading: true,
                text: 'Loại',
            },
            {
                text: 'Video',
            },
            {
                text: 'Kênh',
            },
            {
                text: 'Danh sách phát',
            },
            {
                text: 'Phim',
            },
        ],
        [
            {
                isHeading: true,
                text: 'Thời lượng',
            },
            {
                text: 'Dưới 4 phút',
            },
            {
                text: '4 - 20 phút',
            },
            {
                text: 'Trên 20 phút',
            },
        ],
        [
            {
                isHeading: true,
                text: 'Video nổi bật',
            },
            {
                text: 'Trực tiếp',
            },
            {
                text: '4K',
            },
            {
                text: 'HD',
            },
            {
                text: 'Phụ đề',
            },
            {
                text: 'Giấy phép Creative Commons',
            },
            {
                text: '360',
            },
        ],
        [
            {
                isHeading: true,
                text: 'Sắp xếp theo',
            },
            {
                text: 'Mức độ liên quan',
            },
            {
                text: 'Ngày tải lên',
            },
            {
                text: 'Lượt xem',
            },
            {
                text: 'Xếp hạng',
            },
        ],
    ];
    const [isShow, setIsShow] = useState(false);
    const filterListRef = useRef(null);
    useEffect(() => {
        if (isShow) {
            let height = filterListRef.current.scrollHeight;
            filterListRef.current.style.height = `${height}px`;
        } else {
            filterListRef.current.style.height = 0;
        }
    }, [isShow]);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.heading)}>
                <button onClick={() => setIsShow(!isShow)}>
                    <BsFilter />
                    <span className={clsx(styles.text)}>Bộ lọc</span>
                    <Tooltip
                        content="Mở bộ lọc tìm kiếm"
                        customStyle={{
                            top: 'calc(100% + 16px)',
                            left: '-10px',
                            whiteSpace: 'nowrap',
                            zIndex: 1,
                        }}
                    />
                </button>
            </div>
            <div className={clsx(styles.filterList)} ref={filterListRef}>
                {filterList.map((item, index) => (
                    <ul key={index}>
                        {item.map((item2, index2) =>
                            item2.isHeading ? (
                                <h3 key={index2}>{item2.text}</h3>
                            ) : (
                                <li key={index2}>
                                    <Link to="#" title={item2.text}>
                                        {item2.text}
                                    </Link>
                                </li>
                            ),
                        )}
                    </ul>
                ))}
            </div>
        </div>
    );
}

export default Filter;
