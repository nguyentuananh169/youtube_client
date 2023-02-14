import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import Button from '../../../../components/Button';
import styles from './FilterCategory.module.css';
import Item from './Item';
function FilterCategory() {
    const [numberActive, setNumberActive] = useState(0);
    const [listWidth, setListWidth] = useState(0);
    const [wrapperWidth, setWrapperWidth] = useState(0);
    const [number, setNumber] = useState(0);
    const listCategoryReft = useRef(null);
    const wrapperReft = useRef(null);
    useEffect(() => {
        if (wrapperReft.current) {
            setWrapperWidth(wrapperReft.current.clientWidth);
        }
        if (listCategoryReft.current) {
            setListWidth(listCategoryReft.current.scrollWidth);
        }
    }, []);
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
    const handleChangeNumberActive = (number) => {
        setNumberActive(number);
    };
    const handleNextSlider = () => {
        const numberCurrent = number + 320;
        if (numberCurrent + wrapperWidth > listWidth) {
            setNumber(number + (listWidth - (wrapperWidth + number)));
        } else {
            setNumber(numberCurrent);
        }
    };
    const handlePrevSlider = () => {
        const numberCurrent = number - 320;
        if (numberCurrent < 0) {
            setNumber(0);
        } else {
            setNumber(numberCurrent);
        }
    };
    return (
        <div className={clsx(styles.pos)}>
            <div
                ref={wrapperReft}
                className={clsx(styles.wrapper, {
                    [styles.end]: listWidth - (wrapperWidth + number) > 0,
                    [styles.start]: number > 0,
                })}
            >
                <div className={clsx(styles.btnPrev)}>
                    <Button onClick={handlePrevSlider}>
                        <SlArrowLeft />
                    </Button>
                </div>
                <div className={clsx(styles.btnNext)}>
                    <Button onClick={handleNextSlider}>
                        <SlArrowRight />
                    </Button>
                </div>
                <div
                    ref={listCategoryReft}
                    className={clsx(styles.listCategory)}
                    style={{ transform: `translateX(-${number}px)` }}
                >
                    {data.map((item, index) => (
                        <Item
                            key={index}
                            text={item}
                            active={numberActive === index}
                            index={index}
                            onChangeNumberActive={handleChangeNumberActive}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FilterCategory;
