import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import styles from './Tabs.module.css';
function Tabs() {
    const data = [
        {
            text: 'Trang chủ',
            page: 'home',
        },
        {
            text: 'Video',
            page: 'videos',
        },
        {
            text: 'Danh sách phát',
            page: 'playlist',
        },
        {
            text: 'Cộng đồng',
            page: 'community',
        },
        {
            text: 'Kênh',
            page: 'channels',
        },
        {
            text: 'Giới thiệu',
            page: 'about',
        },
    ];
    const [number, setNumber] = useState(0);
    const [listwidthEl, setListWidthEl] = useState(0);
    const [listContainerWidthEl, setListContainerWidthEl] = useState(0);
    const wrapperRef = useRef(null);
    const containerRef = useRef(null);
    const listContainerRef = useRef(null);
    const listRef = useRef(null);
    const lineRef = useRef(null);
    const btnNextRef = useRef(null);
    const btnPrevRef = useRef(null);

    const params = useParams();
    const isHiddenHeader = useSelector((state) => state.hiddenHeader.isHiddenHeader);
    const isToggleNavbar = useSelector((state) => state.toggleNavbar.isToggleNavbar);
    useEffect(() => {
        if (listRef.current) {
            setListWidthEl(listRef.current.scrollWidth);
        }
        if (listContainerRef.current) {
            setListContainerWidthEl(listContainerRef.current.clientWidth);
        }
    }, []);
    useEffect(() => {
        if (params.page === 'search') {
            const lineEl = lineRef.current;
            lineEl.style.width = 0;
            lineEl.style.left = 0;
        } else {
            const index = data.findIndex((item) => item.page === params.page);
            const indexArr = index >= 0 ? index : 0;
            const tabActiveEl = listRef.current.children[indexArr];
            const lineEl = lineRef.current;
            const width = tabActiveEl.clientWidth;
            const left = tabActiveEl.offsetLeft;
            lineEl.style.width = `${width}px`;
            lineEl.style.left = `${left}px`;
        }
    }, [params.page]);
    useEffect(() => {
        containerRef.current.style.width = `${wrapperRef.current.clientWidth}px`;
        containerRef.current.style.left = `${wrapperRef.current.offsetLeft}px`;
    }, [isToggleNavbar]);
    useEffect(() => {
        const handleScroll = () => {
            const offsetTop = wrapperRef.current.offsetTop - 54;
            if (window.scrollY >= offsetTop) {
                containerRef.current.setAttribute('data-positon', 'fixed');
                containerRef.current.style.width = `${wrapperRef.current.clientWidth}px`;
                containerRef.current.style.left = `${wrapperRef.current.offsetLeft}px`;
            } else {
                containerRef.current.removeAttribute('data-positon', 'fixed');
                containerRef.current.style.width = `100%`;
                containerRef.current.style.left = 0;
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const handleBtnNext = () => {
        const listWidth = listRef.current.scrollWidth;
        const listContainerWidth = listContainerRef.current.clientWidth;
        const num = number + 250;
        if (num + listContainerWidth > listWidth) {
            setNumber(number + (listWidth - (number + listContainerWidth)));
        } else {
            setNumber(num);
        }
    };
    const handleBtnPrev = () => {
        const num = number - 250;
        if (num < 0) {
            setNumber(0);
        } else {
            setNumber(num);
        }
    };
    return (
        <div ref={wrapperRef} className={clsx(styles.wrapper)}>
            <div
                ref={containerRef}
                className={clsx(styles.container, { [styles.hidden]: isHiddenHeader })}
            >
                <div
                    ref={listContainerRef}
                    className={clsx(styles.listContainer, {
                        [styles.prev]: number > 0,
                        [styles.next]: listContainerWidthEl + number < listwidthEl,
                    })}
                >
                    <div
                        ref={listRef}
                        className={clsx(styles.list)}
                        style={{ transform: `translate(-${number}px)` }}
                    >
                        {data.map((item, index) => (
                            <Link
                                to={`/channel/${params.id}/${item.page}`}
                                key={index}
                                className={clsx(styles.tab, {
                                    [styles.active]: item.page === params.page,
                                })}
                            >
                                {item.text}
                            </Link>
                        ))}

                        <div ref={lineRef} className={clsx(styles.line)}></div>
                    </div>
                    <div
                        ref={btnPrevRef}
                        className={clsx(styles.btn, styles.prev)}
                        onClick={handleBtnPrev}
                    >
                        <IoIosArrowBack size={18} color="#606060" />
                    </div>
                    <div
                        ref={btnNextRef}
                        className={clsx(styles.btn, styles.next)}
                        onClick={handleBtnNext}
                    >
                        <IoIosArrowForward size={18} color="#606060" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tabs;
