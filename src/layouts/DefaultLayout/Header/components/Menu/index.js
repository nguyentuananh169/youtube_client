import { FaBars } from 'react-icons/fa';
import { TfiClose } from 'react-icons/tfi';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Menu.module.css';
import Button from '../../../../../components/Button';
import logo from '../../../../../assets/img/logo.png';
import { setIsToggleNavBar } from '../../../../../store/actions/toggleNavbar';
import { useDispatch, useSelector } from 'react-redux';
function Menu() {
    const dispatch = useDispatch();
    const isToggleNavbar = useSelector((state) => state.toggleNavbar.isToggleNavbar);
    return (
        <div className={clsx(styles.wrapper, { [styles.toggle]: isToggleNavbar })}>
            <div className={clsx(styles.icon)} onClick={() => dispatch(setIsToggleNavBar())}>
                <Button>
                    <FaBars />
                </Button>
            </div>
            <div
                className={clsx(styles.icon, styles.close)}
                onClick={() => dispatch(setIsToggleNavBar())}
            >
                <Button>
                    <TfiClose />
                </Button>
            </div>
            <Link to={'/'} className={clsx(styles.logo)}>
                <img src={logo} style={{ width: '90px', height: '20px', objectFit: 'contain' }} />
                <span className={clsx(styles.text)}>VN</span>
            </Link>
        </div>
    );
}

export default Menu;
