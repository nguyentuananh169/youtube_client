import { FaBars } from 'react-icons/fa';
import { TfiClose } from 'react-icons/tfi';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Menu.module.css';
import Button from '../../../../../components/Button';
import logo from '../../../../../assets/img/logo.png';
import useStore from '../../../../../hook/useStore';
import { setIsToggleNavBar } from '../../../../../store/actions';
function Menu() {
    const [state, dispatch] = useStore();
    return (
        <div className={clsx(styles.wrapper, { [styles.toggle]: state.isToggleNavbar })}>
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
