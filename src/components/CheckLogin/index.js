import clsx from 'clsx';
import logo from '../../assets/img/logo.png';
import styles from './CheckLogin.module.css';
function CheckLogin() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.logo)}>
                <img src={logo} />
                <span className={clsx(styles.text)}>VN</span>
            </div>
        </div>
    );
}

export default CheckLogin;
