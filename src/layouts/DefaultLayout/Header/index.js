import clsx from 'clsx';
import Actions from './components/Actions';
import Menu from './components/Menu';
import SearchBox from './components/SeachBox';

import styles from './Header.module.css';
function Header() {
    return (
        <div className={clsx(styles.header)}>
            <Menu />
            <SearchBox />
            <Actions />
        </div>
    );
}

export default Header;
