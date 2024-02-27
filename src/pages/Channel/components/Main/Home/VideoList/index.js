import { useRef, useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import VideoCard from '../../../../../../components/VideoCard';
import styles from './VideoList.module.css';
import { useParams } from 'react-router-dom';
function VideoList({ itemList = [] }) {
    const [wrapperWidth, setWrapperWidth] = useState(0);
    const [listWidth, setListWidth] = useState(0);
    const [number, setNumber] = useState(0);
    const [itemNumberOnPage, setItemNumberOnPage] = useState(5);
    const wrapperRef = useRef(null);
    const listRef = useRef(null);
    const isToggleNavbar = useSelector((state) => state.toggleNavbar.isToggleNavbar);
    const { page } = useParams();
    useEffect(() => {
        setListWidth(listRef.current.scrollWidth - 12);
    }, [wrapperWidth]);
    const handleResize = () => {
        const wrapperWidthEl = wrapperRef.current.clientWidth;
        const listWidthEl = listRef.current.scrollWidth - 12;
        setWrapperWidth(wrapperWidthEl);
        setListWidth(listWidthEl);
        if (wrapperWidthEl > 1020) {
            setItemNumberOnPage(5);
        }
        if (wrapperWidthEl <= 1020 && wrapperWidthEl >= 901) {
            setItemNumberOnPage(4);
        } else if (wrapperWidthEl <= 900 && wrapperWidthEl >= 620) {
            setItemNumberOnPage(3);
        } else if (wrapperWidthEl <= 619 && wrapperWidthEl >= 400) {
            setItemNumberOnPage(2);
        } else if (wrapperWidthEl < 400) {
            setItemNumberOnPage(1);
        }
    };
    useEffect(() => {
        if (page === 'home') {
            handleResize();
        }
    }, [isToggleNavbar, page, itemList]);
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleNext = () => {
        const num = number + wrapperWidth;
        if (num + wrapperWidth > listWidth) {
            setNumber(number + (listWidth - num));
        } else {
            setNumber(num);
        }
    };
    const handlePrev = () => {
        const num = number - wrapperWidth;
        if (num < 0) {
            setNumber(0);
        } else {
            setNumber(num);
        }
    };
    return (
        <div
            ref={wrapperRef}
            className={clsx(styles.wrapper, {
                [styles.prev]: number > 0,
                [styles.next]: wrapperWidth + number < listWidth - 5,
            })}
        >
            <button className={clsx(styles.btn, styles.prev)} onClick={handlePrev}>
                <IoIosArrowBack size={20} color="#606060" />
            </button>
            <button className={clsx(styles.btn, styles.next)} onClick={handleNext}>
                <IoIosArrowForward size={20} color="#606060" />
            </button>
            <div className={clsx(styles.container)}>
                <div
                    ref={listRef}
                    className={clsx(styles.list)}
                    style={{ marginLeft: `-${number || 5}px` }}
                >
                    {itemList.map((item) => (
                        <div
                            key={item.video_id}
                            className={clsx(styles.item)}
                            style={{ width: `${wrapperWidth / itemNumberOnPage - 5}px` }}
                        >
                            <VideoCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VideoList;
