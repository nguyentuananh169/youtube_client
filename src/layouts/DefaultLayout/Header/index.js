import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Actions from './components/Actions';
import Menu from './components/Menu';
import SearchBox from './components/SeachBox';
import styles from './Header.module.css';
import useStore from '../../../hook/useStore';
import { setIsHiddenHeader } from '../../../store/actions';
function Header({ handleToggleGuide }) {
    const [state, dispatch] = useStore();
    const { pathname } = useLocation();
    useEffect(() => {
        const watchPage = pathname.startsWith('/watch/');
        if (watchPage) {
            return dispatch(setIsHiddenHeader(false));
        }
        if (window.innerWidth <= 768) {
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
        <div className={clsx(styles.header, { [styles.hidden]: state.isHiddenHeader })}>
            <Menu handleToggleGuide={handleToggleGuide} />
            <SearchBox />
            <Actions />
        </div>
    );
}

export default Header;
