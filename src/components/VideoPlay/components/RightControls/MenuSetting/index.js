import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import clsx from 'clsx';
import MenuItem from './MenuItem';
import styles from './MenuSetting.module.css';

function MenuSetting({ items = [], playSpeed, handleChangeSpeed }) {
    const [dataMenu, setDataMenu] = useState([{ data: items }]);
    const current = dataMenu[dataMenu.length - 1];

    const handleNextMenu = (item) => {
        setDataMenu((prev) => [...prev, item]);
    };
    const handleBackMenu = () => {
        setDataMenu((prev) => prev.slice(0, prev.length - 1));
    };
    return (
        <div className={clsx(styles.wrapper)}>
            {dataMenu.length > 1 && (
                <div className={clsx(styles.header, styles.item)} onClick={handleBackMenu}>
                    <span className={clsx(styles.icon)}>
                        <IoIosArrowBack />
                    </span>
                    {current.title}
                </div>
            )}
            {current.data.map((item, index) => {
                const isParent = !!item.children;
                const code = current.code;
                return (
                    <MenuItem
                        key={index}
                        item={item}
                        length={dataMenu.length}
                        active={playSpeed === item.value}
                        handleChangeSpeed={handleChangeSpeed}
                        onClick={() => {
                            if (isParent) {
                                return handleNextMenu(item.children);
                            }
                            if (code === 'speed') {
                                handleBackMenu();
                                handleChangeSpeed(item.value, item.title);
                            } else if (code === 'quality') {
                                handleBackMenu();
                            }
                        }}
                    />
                );
            })}
        </div>
    );
}

export default MenuSetting;
