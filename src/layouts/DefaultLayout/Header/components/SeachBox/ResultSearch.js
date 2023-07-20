import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { RiHistoryFill } from 'react-icons/ri';
import { TfiSearch } from 'react-icons/tfi';
import styles from './SearchBox.module.css';
function ResultSearch({ dataList, setValueInput }) {
    const naviagte = useNavigate();
    const handleClickBtn = (value) => {
        setValueInput(value);
        naviagte(`/search/${value}`);
    };
    return (
        <ul>
            {dataList.data.map((item) => (
                <li key={item.id}>
                    <div className={clsx(styles.btn)} onClick={() => handleClickBtn(item.text)}>
                        <span className={clsx(styles.btnIcon)}>
                            {dataList.type === 'history' ? <RiHistoryFill /> : <TfiSearch />}
                        </span>
                        <strong className={clsx(styles.text)}>{item.text}</strong>
                    </div>
                    <span className={clsx(styles.delete)}>Xóa</span>
                </li>
            ))}
        </ul>
    );
}

export default ResultSearch;
