import { HiOutlineMicrophone } from 'react-icons/hi';
import { TfiSearch } from 'react-icons/tfi';
import { GoKeyboard } from 'react-icons/go';
import { TfiClose } from 'react-icons/tfi';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import Button from '../../../../../components/Button';
import Tooltip from '../../../../../components/Tooltip';
import ResultSearch from './ResultSearch';
import useClickOutSide from '../../../../..//hook/useClickOutSide';
import styles from './SearchBox.module.css';
import { useNavigate } from 'react-router-dom';
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
    const [valueInput, setValueInput] = useState('');
    const [dataList, setDataList] = useState(init);
    const timeoutRef = useRef(null);
    const naviagte = useNavigate();
    const handleChangeInput = (value) => {
        setValueInput(value);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (value) {
            timeoutRef.current = setTimeout(() => {
                const data = [
                    { id: 1, text: `${value} 1` },
                    { id: 2, text: `${value} 2` },
                    { id: 3, text: `${value} 3` },
                    { id: 4, text: `${value} 4` },
                    { id: 5, text: `${value} 5` },
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
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.searchBox)}>
                <form
                    ref={elementRef}
                    className={clsx(styles.form, { [styles.active]: isShow })}
                    onSubmit={handleSubmit}
                >
                    <span className={clsx(styles.iconSearch, styles.btnIcon)}>
                        <TfiSearch />
                    </span>
                    {/* <i
                        className={clsx(
                            'fa-solid fa-magnifying-glass',
                            styles.btnIcon,
                            styles.iconSearch,
                            {
                                [styles.active]: showResult,
                            },
                        )}
                    ></i> */}
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
                            <ResultSearch dataList={dataList} />
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
            <div className={clsx(styles.voiceBtn)}>
                <Button>
                    <HiOutlineMicrophone />
                </Button>
                <div className={clsx(styles.tooltip)}>
                    <Tooltip content="Tìm kiếm bằng giọng nói" />
                </div>
            </div>
        </div>
    );
}

export default SearchBox;
