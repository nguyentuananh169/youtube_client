import clsx from 'clsx';
import Logo from './Logo';
import SearchBox from './SearchBox';
import Actions from './Actions';
import styles from './Header.module.css';
function Header({ headerRef }) {
    return (
        <div ref={headerRef} className={clsx(styles.wrapper)}>
            <Logo />
            <SearchBox />
            <Actions />
        </div>
    );
}

export default Header;
