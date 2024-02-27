import { FaBars } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { setIsToggleNavBar2 } from '../../../../store/actions/toggleNavbar';
import DotMenu from '../../../../components/DotMenu';
import styles from './Logo.module.css';
import logoStudioYoutube from '../../../../assets/img/logo-studio-youtube.png';
function Logo() {
    const dispatch = useDispatch();
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.bars)} onClick={() => dispatch(setIsToggleNavBar2())}>
                <DotMenu icon={<FaBars size={20} color="#888" />} />
            </div>
            <div className={clsx(styles.logo)}>
                <Link to="/studio">
                    <img src={logoStudioYoutube} />
                </Link>
            </div>
        </div>
    );
}

export default Logo;
