import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Logo from './Logo';
import SearchBox from './SearchBox';
import Actions from './Actions';
import Loading from './Loading';
import useStore from '../../../hook/useStore';
import styles from './Header.module.css';
function Header({ headerRef }) {
    const [state] = useStore();
    return (
        <div
            ref={headerRef}
            className={clsx(styles.wrapper, { [styles.hidden]: state.isHiddenHeader2 })}
        >
            <Logo />
            <SearchBox />
            <Actions />
            <Loading />
        </div>
    );
}

export default Header;
