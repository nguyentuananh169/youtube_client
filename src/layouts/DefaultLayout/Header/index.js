import clsx from 'clsx';
import { useContext } from 'react';
import Actions from './components/Actions';
import Menu from './components/Menu';
import SearchBox from './components/SeachBox';

import styles from './Header.module.css';
function Header({ handleToggleGuide }) {
    return (
        <div className={clsx(styles.header)}>
            <Menu handleToggleGuide={handleToggleGuide} />
            <SearchBox />
            <Actions />
        </div>
    );
}

export default Header;
