import { VscListFilter } from 'react-icons/vsc';
import { TfiClose } from 'react-icons/tfi';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Tooltip from '../../../../components/Tooltip';
import FilterList from './FilterList';
import DropdownMenu from './DropdownMenu';
import useClickOutSide from '../../../../hook/useClickOutSide';
import styles from './Filter.module.css';
function Filter({ initMenu = [], initFilterData = {}, initFilterText = {} }) {
    const [isLoading, setLoading] = useState(false);
    const [filterMenu, setFilterMenu] = useState([...initMenu]);
    const [filterData, setFilterData] = useState({ ...initFilterData });
    const [filterText, setFilterText] = useState({ ...initFilterText });
    const [filterList, setFilterList] = useState([]);
    const [elementRef, isShow, setShow] = useClickOutSide();
    const codeRef = useRef(null);
    useEffect(() => {
        const code = codeRef.current;
        if (!isShow && !isLoading && code) {
            setFilterData({ ...filterData, [code]: initFilterData[code] });
            setFilterText({ ...filterText, [code]: initFilterText[code] });
        }
    }, [isShow]);
    const handleSetCodeRef = (code) => {
        codeRef.current = code;
    };
    const handleSetFilterData = (code, valueText = '', valueCode = '') => {
        let itemData = filterData[code];
        let itemFilterText = filterText[code];
        if (code === 'copyright') {
            itemData = !filterData[code];
            itemFilterText = !filterText[code];
            handleSubmit();
        } else if (Array.isArray(itemData)) {
            const index = itemData.indexOf(valueCode);
            if (index === -1) {
                itemData.push(valueCode);
                itemFilterText.push(valueText);
            } else {
                itemData.splice(index, 1);
                itemFilterText.splice(index, 1);
            }
        } else {
            itemData = valueCode || valueText;
            itemFilterText = valueText;
        }
        setFilterData({ ...filterData, [code]: itemData });
        setFilterText({ ...filterText, [code]: itemFilterText });
    };
    const handleSearchVideo = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    const handleRemoveFilterList = (code) => {
        const arr = filterMenu;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].code === code) {
                arr[i].isHidden = false;
                break;
            }
        }
        const arr2 = filterList.filter((item) => item.code !== code);
        setFilterList(arr2);
        setFilterData({ ...filterData, [code]: initFilterData[code] });
        setFilterText({ ...filterText, [code]: initFilterText[code] });
        handleSearchVideo();
    };
    const handleClickRemoveAll = () => {
        setFilterList([]);
        setFilterMenu(initMenu);
        setFilterData(initFilterData);
        setFilterText(initFilterText);
        handleSetCodeRef(null);
        handleSubmit();
    };
    const handleSubmit = () => {
        const code = codeRef.current;
        if (code) {
            // set filter menu
            const arr = filterMenu;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].code === code) {
                    arr[i].isHidden = true;
                    break;
                }
            }
            setFilterMenu(arr);
            // set filter list
            const arr2 = filterList;
            const check = arr2.filter((item) => item.code === code);
            if (!check.length > 0) {
                const itemFilter = initMenu.filter((item) => item.code === code);
                const objFilter = {
                    id: itemFilter[0].id,
                    code: itemFilter[0].code,
                    title: itemFilter[0].title,
                    valueText: filterText[code],
                };
                arr2.push(objFilter);
                setFilterList(arr2);
            }
        }
        setShow(false);
        codeRef.current = null;
        handleSearchVideo();
    };
    // console.log(filterData);
    return (
        <div className={clsx(styles.filter)}>
            {isLoading && <div className={clsx(styles.loading)}></div>}
            <label className={clsx(styles.icon)} htmlFor="my-input">
                <VscListFilter size={24} color="#838282" />
            </label>
            <div className={clsx(styles.menu)}>
                {filterList.map((item, index) => (
                    <FilterList
                        key={index}
                        item={item}
                        handleRemoveFilterList={handleRemoveFilterList}
                    />
                ))}
                <div ref={elementRef} className={clsx(styles.input)} onClick={() => setShow(true)}>
                    {isShow && (
                        <DropdownMenu
                            filterMenu={filterMenu}
                            filterData={filterData}
                            setShow={setShow}
                            handleSetFilterData={handleSetFilterData}
                            handleSubmit={handleSubmit}
                            handleSetCodeRef={handleSetCodeRef}
                        />
                    )}

                    <input
                        className={clsx(styles.search)}
                        id="my-input"
                        type="text"
                        placeholder="Lọc"
                    />
                </div>
            </div>
            <div
                className={clsx(styles.removeAll, { [styles.show]: filterList.length })}
                onClick={handleClickRemoveAll}
            >
                <Tooltip
                    data-class="tooltip"
                    content={'Xóa bộ lọc'}
                    customStyle={{
                        top: 'calc(100% + 23px)',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        whiteSpace: 'nowrap',
                        fontSize: '1rem',
                        fontWeight: '500',
                        padding: '7px',
                        backgroundColor: '#848484',
                    }}
                />
                <TfiClose size={17} />
            </div>
        </div>
    );
}

export default Filter;
