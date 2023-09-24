import { HiOutlineMicrophone } from 'react-icons/hi';
import { TfiSearch } from 'react-icons/tfi';
import { GoKeyboard } from 'react-icons/go';
import { TfiClose, TfiArrowLeft } from 'react-icons/tfi';

import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import Button from '../../../../../components/Button';
import Tooltip from '../../../../../components/Tooltip';
import ResultSearch from './ResultSearch';
import useClickOutSide from '../../../../..//hook/useClickOutSide';
import styles from './SearchBox.module.css';
function SearchBox() {
    const array = localStorage.getItem('search_list')
        ? JSON.parse(localStorage.getItem('search_list'))
        : [];
    const init = {
        type: 'history',
        list: array,
    };
    const [elementRef, isShow, setShow] = useClickOutSide(false);
    const [isSearchBoxMobile, setIsSearchBoxMobile] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [dataList, setDataList] = useState(init);
    const timeoutRef = useRef(null);
    const inputRef = useRef(null);
    const naviagte = useNavigate();
    const { pathname } = useLocation();
    const params = useParams();
    useEffect(() => {
        setShow(false);
        setIsSearchBoxMobile(false);
    }, [pathname]);
    useEffect(() => {
        if (params.keyword) {
            handleChangeInput(params.keyword);
        }
    }, [params.keyword]);
    const handleChangeInput = (value) => {
        setValueInput(value);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (value) {
            timeoutRef.current = setTimeout(() => {
                const data = [
                    { id: 1, keyword: `${value}1` },
                    { id: 2, keyword: `${value}2` },
                    { id: 3, keyword: `${value}3` },
                    { id: 4, keyword: `${value}4` },
                    { id: 5, keyword: `${value}5` },
                ];
                setDataList({ type: 'search', list: data });
            }, 500);
        } else {
            setDataList(init);
        }
    };

    const handleClearInput = () => {
        handleChangeInput('');
        inputRef.current.focus();
        setShow(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!valueInput) {
            return;
        }
        const currentDate = new Date();
        const milliseconds = currentDate.getTime();
        const searchList = JSON.parse(localStorage.getItem('search_list'));
        if (searchList && searchList.length > 0) {
            const obj = {
                id: milliseconds,
                keyword: valueInput,
            };
            const index = searchList.findIndex((item) => item.keyword === valueInput);
            if (index >= 0) {
                searchList.splice(index, 1);
            } else {
                if (searchList.length >= 5) {
                    searchList.pop();
                }
            }
            let arr = [obj, ...searchList];
            localStorage.setItem('search_list', JSON.stringify(arr));
        } else {
            let arr = [{ id: milliseconds, keyword: valueInput }];
            localStorage.setItem('search_list', JSON.stringify(arr));
        }
        naviagte(`/search/${valueInput}`);
    };
    useEffect(() => {
        if (!isShow) {
            inputRef.current.blur();
            const searchList = localStorage.getItem('search_list')
                ? JSON.parse(localStorage.getItem('search_list'))
                : [];
            setDataList((state) => ({ ...state, list: searchList }));
        }
    }, [isShow]);
    return (
        <>
            <div
                className={clsx(styles.overlay, { [styles.show]: isSearchBoxMobile })}
                onClick={() => setIsSearchBoxMobile(false)}
            ></div>
            <div className={clsx(styles.wrapper, { [styles.mobile]: isSearchBoxMobile })}>
                <div className={clsx(styles.searchBox)}>
                    <div
                        className={clsx(styles.btnBack)}
                        onClick={() => setIsSearchBoxMobile(false)}
                    >
                        <Tooltip
                            content={'Quay lại'}
                            customStyle={{
                                top: 'calc(100% + 16px)',
                                left: '0',
                                whiteSpace: 'nowrap',
                            }}
                        />
                        <TfiArrowLeft />
                    </div>
                    <form
                        ref={elementRef}
                        className={clsx(styles.form, { [styles.active]: isShow })}
                        onSubmit={handleSubmit}
                    >
                        <span className={clsx(styles.iconSearch, styles.btnIcon)}>
                            <TfiSearch />
                        </span>
                        <input
                            ref={inputRef}
                            placeholder="Tìm kiếm"
                            value={valueInput}
                            onChange={(e) => handleChangeInput(e.target.value)}
                            onClick={() => setShow(true)}
                        />
                        <div className={clsx(styles.keyboard, styles.btnIcon)}>
                            <GoKeyboard />
                        </div>
                        <div
                            className={clsx(styles.close, styles.btnIcon, {
                                [styles.active]: valueInput,
                            })}
                            onClick={handleClearInput}
                        >
                            <TfiClose />
                        </div>
                        {isShow && dataList.list.length > 0 && (
                            <div className={clsx(styles.dropdown)}>
                                <ResultSearch
                                    dataList={dataList}
                                    setValueInput={setValueInput}
                                    setDataList={setDataList}
                                />
                            </div>
                        )}
                    </form>
                    <div className={clsx(styles.submitBtn)} onClick={handleSubmit}>
                        <Button>
                            <TfiSearch />
                        </Button>
                        <div className={clsx(styles.tooltip)}>
                            <Tooltip content="Tìm kiếm" />
                        </div>
                    </div>
                </div>
                <div
                    className={clsx(styles.btnFormMobile, { [styles.hiden]: isSearchBoxMobile })}
                    onClick={() => setIsSearchBoxMobile(true)}
                >
                    <Tooltip
                        content={'Tìm kiếm'}
                        customStyle={{
                            top: 'calc(100% + 34px)',
                            left: '50%',
                            transform: 'translate(-50%,-50%)',
                            whiteSpace: 'nowrap',
                        }}
                    />
                    <TfiSearch />
                </div>
                <div className={clsx(styles.voiceBtn)}>
                    <Button>
                        <HiOutlineMicrophone />
                    </Button>
                    <div className={clsx(styles.tooltip)}>
                        <Tooltip content="Tìm kiếm bằng giọng nói" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchBox;
