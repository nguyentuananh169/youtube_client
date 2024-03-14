import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Actions from './components/Actions';
import Menu from './components/Menu';
import SearchBox from './components/SeachBox';
import styles from './Header.module.css';
import { setIsHiddenHeader } from '../../../store/actions/hiddenHeader';
function Header({ handleToggleGuide }) {
    const dispatch = useDispatch();
    const isHiddenHeader = useSelector((state) => state.hiddenHeader.isHiddenHeader);
    const { pathname } = useLocation();
    useEffect(() => {
        if (pathname === '/watch') {
            dispatch(setIsHiddenHeader(false));
        } else if (window.innerWidth <= 768) {
            let prevScrollPos = window.pageYOffset;
            const handleScroll = () => {
                const currentScrollPos = window.pageYOffset;
                if (prevScrollPos < currentScrollPos && currentScrollPos > 100) {
                    dispatch(setIsHiddenHeader(true));
                } else {
                    dispatch(setIsHiddenHeader(false));
                }
                prevScrollPos = window.pageYOffset;
            };
            document.addEventListener('scroll', handleScroll);
            return () => {
                document.removeEventListener('scroll', handleScroll);
            };
        }
    }, [pathname]);
    return (
        <div
            className={clsx(styles.header, {
                [styles.hidden]: isHiddenHeader,
                [styles.pageShorts]: pathname === '/shorts',
            })}
        >
            <Menu handleToggleGuide={handleToggleGuide} />
            <SearchBox />
            <Actions />
        </div>
    );
}

export default Header;
