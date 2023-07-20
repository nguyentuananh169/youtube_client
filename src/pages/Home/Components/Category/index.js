import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import useStore from '../../../../hook/useStore';
import styles from './Category.module.css';
import FilterSlider from '../../../../components/FilterSlider';
function Category() {
    const data = [
        'Tất cả',
        'Âm nhạc',
        'Trò chơi',
        'Danh sách kết hợp',
        'Trực tiếp',
        'Hài kịch tình huống',
        'Trò chơi hành động phưu lưu',
        'Bóng đá',
        'Đọc rap',
        'Nấu ăn',
        'Hoạt hình',
        'Mới tải lên gần đây',
        'Đều xuất mới',
    ];

    const [width, setWidth] = useState(null);
    const wrapperRef = useRef(null);
    const [state] = useStore();

    useEffect(() => {
        const handleResize = () => {
            const wrapperEl = wrapperRef.current;
            const width = wrapperEl.clientWidth;
            setWidth(width);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [state.isToggleNavbar]);
    return (
        <div ref={wrapperRef} className={clsx(styles.wrapper)}>
            <div className={clsx(styles.category, { [styles.hidden]: state.isHiddenHeader })}>
                <FilterSlider itemList={data} width={width} />
            </div>
        </div>
    );
}

export default Category;
