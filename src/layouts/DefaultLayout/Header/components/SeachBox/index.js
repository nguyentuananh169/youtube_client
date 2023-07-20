import { HiOutlineMicrophone } from 'react-icons/hi';
import { TfiSearch } from 'react-icons/tfi';
import { GoKeyboard } from 'react-icons/go';
import { TfiClose, TfiArrowLeft } from 'react-icons/tfi';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import Button from '../../../../../components/Button';
import Tooltip from '../../../../../components/Tooltip';
import ResultSearch from './ResultSearch';
import useClickOutSide from '../../../../..//hook/useClickOutSide';
import styles from './SearchBox.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
function SearchBox() {
    const init = {
        type: 'history',
        data: [
            {
                id: '1',
                text: 'Lịch sử tìm kiếm 1',
            },
            {
                id: '2',
                text: 'Lịch sử tìm kiếm 2',
            },
            {
                id: '3',
                text: 'Lịch sử tìm kiếm 3',
            },
            {
                id: '4',
                text: 'Lịch sử tìm kiếm 4',
            },
            {
                id: '5',
                text: 'Lịch sử tìm kiếm 5',
            },
        ],
    };
    const [elementRef, isShow, setShow] = useClickOutSide(false);
    const [isSearchBoxMobile, setIsSearchBoxMobile] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [dataList, setDataList] = useState(init);
    const timeoutRef = useRef(null);
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
    }, []);

    const handleChangeInput = (value) => {
        setValueInput(value);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (value) {
            timeoutRef.current = setTimeout(() => {
                const data = [
                    { id: 1, text: `Nội dung liên quan ${value} 1` },
                    { id: 2, text: `Nội dung liên quan ${value} 2` },
                    { id: 3, text: `Nội dung liên quan ${value} 3` },
                    { id: 4, text: `Nội dung liên quan ${value} 4` },
                    { id: 5, text: `Nội dung liên quan ${value} 5` },
                ];
                setDataList({ type: 'search', data: data });
            }, 500);
        } else {
            setDataList(init);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (valueInput) {
            naviagte(`/search/${valueInput}`);
        }
    };
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
                            onClick={() => handleChangeInput('')}
                        >
                            <TfiClose />
                        </div>
                        {isShow && (
                            <div className={clsx(styles.dropdown)}>
                                <ResultSearch dataList={dataList} setValueInput={setValueInput} />
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
