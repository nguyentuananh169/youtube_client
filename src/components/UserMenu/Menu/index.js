import { HiOutlineArrowLeft } from 'react-icons/hi';
import { TfiClose } from 'react-icons/tfi';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';
import styles from './Menu.module.css';
import NoAvatar from '../../NoAvatar';
function Menu({ user, menu = [], data, handleChangeMenu, setShow }) {
    const userMenuRef = useRef(null);
    const [menuList, setMenuList] = useState([{ data: menu }]);
    const currentMenu = menuList[menuList.length - 1];
    const handleNextMenu = (item) => {
        setMenuList((prev) => [...prev, item]);
    };
    const handleBackMenu = () => {
        setMenuList((prev) => prev.slice(0, prev.length - 1));
    };
    useEffect(() => {
        if (userMenuRef.current) {
            const element = userMenuRef.current;
            const offsetTop = element.getBoundingClientRect().top;
            element.style.maxHeight = `calc(100vh - ${offsetTop}px)`;
        }
    }, []);
    return (
        <div
            ref={userMenuRef}
            className={clsx(styles.userMenu)}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div className={clsx(styles.close)}>
                <TfiClose size={17} onClick={() => setShow(false)} />
                <span>Tài khoản</span>
            </div>
            {menuList.length > 1 ? (
                <div className={clsx(styles.title)}>
                    <div className={clsx(styles.icon)} onClick={handleBackMenu}>
                        <HiOutlineArrowLeft />
                    </div>
                    <span>{currentMenu.title}</span>
                </div>
            ) : (
                <div className={clsx(styles.header)}>
                    <div className={clsx(styles.avatar)}>
                        {user.user_avatar ? (
                            <img src={user.user_avatar} />
                        ) : (
                            <NoAvatar userName={user.user_name} />
                        )}
                    </div>
                    <div className={clsx(styles.info)}>
                        <p className={clsx(styles.userName)}>{user.user_name}</p>
                        <p className={clsx(styles.userId)}>{user.user_tag}</p>
                        <Link to={'/'}>Quản lý tài khoản Google của bạn</Link>
                    </div>
                </div>
            )}
            <div className={clsx(styles.main)}>
                <ul>
                    {currentMenu.data.map((item, index) => {
                        const isParent = !!item.children;
                        const code = currentMenu.code || null;
                        const value = item.value || null;
                        return (
                            <MenuItem
                                key={index}
                                item={item}
                                isParent={isParent}
                                active={data[code] === value}
                                onClick={() => {
                                    if (isParent) {
                                        return handleNextMenu(item.children);
                                    } else {
                                        handleChangeMenu(code, value, item.text);
                                        handleBackMenu();
                                    }
                                }}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Menu;
