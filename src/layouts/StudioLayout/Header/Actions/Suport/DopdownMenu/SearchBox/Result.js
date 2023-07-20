import { GiNotebook } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Result.module.css';
function Result({ resultList = [], setShow }) {
    return (
        <div className={clsx(styles.result)} onClick={() => setShow(false)}>
            {resultList.length > 0 && (
                <ul>
                    <li className={clsx(styles.title)}>
                        <span>Kết quả tìm kiếm</span>
                    </li>
                    {resultList.map((item, index) => (
                        <li key={index}>
                            <Link className={clsx(styles.btn)} to={'#'}>
                                <div className={clsx(styles.icon)}>
                                    <GiNotebook size={18} color="#0b57d0" />
                                </div>
                                <div className={clsx(styles.content)}>
                                    <span>{item.title}</span>
                                    <p>{item.des}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Result;
