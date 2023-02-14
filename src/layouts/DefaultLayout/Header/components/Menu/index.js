import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import clsx from 'clsx';
import styles from './Menu.module.css';
import Button from '../../../../../components/Button';
import logo from '../../../../../assets/img/logo.png';
function Menu() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.bars)}>
                <Button>
                    <FaBars />
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
