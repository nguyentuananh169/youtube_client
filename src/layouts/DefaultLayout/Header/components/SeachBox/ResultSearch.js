import clsx from 'clsx';
import { RiHistoryFill } from 'react-icons/ri';
import { TfiSearch } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import styles from './SearchBox.module.css';
function ResultSearch({ dataList }) {
    return (
        <ul>
            {dataList.data.map((item) => (
                <li key={item.id}>
                    <Link to={'/search'}>
                        <span className={clsx(styles.btnIcon)}>
                            {dataList.type === 'history' ? <RiHistoryFill /> : <TfiSearch />}
                        </span>
                        <strong className={clsx(styles.text)}>{item.text}</strong>
                    </Link>
                    <span className={clsx(styles.delete)}>Xóa</span>
                </li>
            ))}
        </ul>
    );
}

export default ResultSearch;
