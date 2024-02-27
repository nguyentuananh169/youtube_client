import { TfiClose } from 'react-icons/tfi';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { objectRules } from '../../../../../hook/useValidateForm';
import Item from './Item';
import Tooltip from '../../../../../components/Tooltip';
import InputMenu from '../InputMenu';
import styles from './DropdownMenu.module.css';
function DropdownMenu({
    filterMenu,
    filterData,
    setShow,
    handleSetFilterData,
    handleSetCodeRef,
    handleSubmit,
}) {
    const [isAllowedSubmit, setAllowedSubmit] = useState(false);
    const [menuList, setMenuList] = useState([{ data: filterMenu }]);
    const currentMenu = menuList[menuList.length - 1];
    const currentData = filterData[currentMenu.code];
    const checkShow = filterMenu.filter((item) => item.isHidden === false);
    const handleNextMenu = (item) => {
        setMenuList((prev) => [...prev, item]);
    };
    useEffect(() => {
        const code = currentMenu.code;
        if (code) {
            let isAllowed = true;
            const objectValidates = currentMenu.validates || {};
            const isArray = Array.isArray(currentData);
            const data = isArray ? currentData[currentData.length - 1] : currentData;
            for (let item in objectValidates) {
                const error = objectRules[item](code, data);
                if (error) {
                    isAllowed = false;
                    break;
                }
            }
            setAllowedSubmit(isAllowed);
        }
    }, [filterData]);
    const handleCheckAllowedSubmit = (e) => {
        e.preventDefault();
        if (isAllowedSubmit) {
            const objData = filterData;
            handleSubmit(objData);
        }
    };

    return (
        <form
            className={clsx(styles.dropdownMenu)}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleCheckAllowedSubmit}
        >
            {menuList.length > 1 && (
                <div className={clsx(styles.heading)}>
                    <h3>{currentMenu.title}</h3>
                    <div className={clsx(styles.backMenu)} onClick={() => setShow(false)}>
                        <Tooltip
                            data-class={'tooltip'}
                            content={'Đóng'}
                            customStyle={{
                                top: 'calc(100% + 25px)',
                                left: '50%',
                                transform: 'translate(-50%,-50%)',
                                padding: '5px 7px',
                                fontSize: '1.1rem',
                            }}
                        />
                        <TfiClose size={20} color="#606060" />
                    </div>
                </div>
            )}
            {!currentMenu.isComp && (
                <ul className={clsx(styles.menu, { [styles.menu2]: menuList.length > 1 })}>
                    {checkShow.length === 0 && (
                        <li className={clsx(styles.noItem)}>Không có bộ lọc nào</li>
                    )}
                    {currentMenu.data.map((item, index) => {
                        if (item.isHidden) {
                            return;
                        }
                        const isParent = !!item.children;
                        const valueType = currentMenu.valueType || item.valueType;
                        const code = currentMenu.code || item.code;
                        const title = currentMenu.title || item.title;
                        return (
                            <Item
                                key={item.id}
                                item={item}
                                title={title}
                                data={currentData}
                                menuLv2={menuList.length > 1}
                                onClick={() => {
                                    if (isParent) {
                                        return handleNextMenu(item.children);
                                    } else {
                                        handleSetCodeRef(code);
                                        handleSetFilterData(
                                            code,
                                            item.valueText,
                                            item.valueCode,
                                            valueType,
                                        );
                                    }
                                }}
                            />
                        );
                    })}
                </ul>
            )}
            {currentMenu.isComp && (
                <div className={clsx(styles.menu2)}>
                    <InputMenu
                        code={currentMenu.code}
                        compLv={currentMenu.compLv || 1}
                        valueInput={currentData}
                        handleSetFilterData={handleSetFilterData}
                        handleSetCodeRef={handleSetCodeRef}
                    />
                </div>
            )}
            {menuList.length > 1 && (
                <div className={clsx(styles.submit)}>
                    <button className={clsx({ [styles.allowed]: isAllowedSubmit })}>Áp dụng</button>
                </div>
            )}
        </form>
    );
}

export default DropdownMenu;
