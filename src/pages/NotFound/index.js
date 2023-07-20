import { AiOutlineSearch } from 'react-icons/ai';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import img from '../../assets/img/monkey.png';
import logo from '../../assets/img/logo.png';
import styles from './NotFound.module.css';
function NotFound() {
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (value) {
            navigate(`/search/${value}`);
        }
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.img)}>
                    <img src={img} />
                </div>
                <div className={clsx(styles.text)}>
                    <p>Trang này không có sẵn. Mong bạn thông cảm.</p>
                    <p>Bạn thử tìm cụm từ khác xem sao nhé.</p>
                </div>
                <div className={clsx(styles.bottom)}>
                    <Link to="/">
                        <div className={clsx(styles.logo)}>
                            <img src={logo} />
                            <span>VN</span>
                        </div>
                    </Link>
                    <form className={clsx(styles.form)} onSubmit={handleSubmit}>
                        <input
                            placeholder="Tìm kiếm"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <button>
                            <AiOutlineSearch size={19} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
