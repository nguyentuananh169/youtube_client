import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';

import clsx from 'clsx';
import styles from './FilterSlider.module.css';
import Item from './Item';
import { useEffect, useRef, useState } from 'react';
function FilterSlider({ itemList = [], width, handleClick = () => {} }) {
    const [itemId, setItemId] = useState(itemList.length > 0 ? itemList[0].id : '');
    const [listWidth, setListWidth] = useState(0);
    const [wrapperWidth, setWrapperWidth] = useState(0);
    const [number, setNumber] = useState(0);
    const listRef = useRef(null);
    const wrapperRef = useRef(null);
    useEffect(() => {
        if (wrapperRef.current) {
            setWrapperWidth(wrapperRef.current.offsetWidth);
        }
        if (listRef.current) {
            setListWidth(listRef.current.scrollWidth);
        }
    }, [width, itemList]);
    const handleChangeItemId = (id) => {
        setItemId(id);
        handleClick(id);
    };
    const handleNextSlider = () => {
        const numberCurrent = number + 250;
        if (numberCurrent + wrapperWidth > listWidth) {
            setNumber(number + (listWidth - (wrapperWidth + number)));
        } else {
            setNumber(numberCurrent);
        }
    };
    const handlePrevSlider = () => {
        const numberCurrent = number - 250;
        if (numberCurrent < 0) {
            setNumber(0);
        } else {
            setNumber(numberCurrent);
        }
    };
    return (
        <div
            ref={wrapperRef}
            className={clsx(styles.wrapper, {
                [styles.end]: listWidth - (wrapperWidth + number) > 0,
                [styles.start]: number > 0,
            })}
            style={{ width }}
        >
            <div className={clsx(styles.btnPrev)}>
                <button onClick={handlePrevSlider}>
                    <SlArrowLeft />
                </button>
            </div>
            <div className={clsx(styles.btnNext)}>
                <button onClick={handleNextSlider}>
                    <SlArrowRight />
                </button>
            </div>
            <div
                ref={listRef}
                className={clsx(styles.list)}
                style={{ transform: `translateX(-${number}px)` }}
            >
                {itemList.map((item, index) => (
                    <Item
                        key={index}
                        item={item}
                        index={index}
                        active={itemId === item.id}
                        onChangeItemId={handleChangeItemId}
                    />
                ))}
            </div>
        </div>
    );
}

export default FilterSlider;
