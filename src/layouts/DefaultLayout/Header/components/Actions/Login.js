import { HiOutlineUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Actions.module.css';
function Login() {
    return (
        <Link to={'/login'} className={clsx(styles.btnLogin)}>
            <HiOutlineUserCircle size={22} />
            <span>Đăng nhập</span>
        </Link>
    );
}

export default Login;
