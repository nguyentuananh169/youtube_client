import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { VscHistory } from 'react-icons/vsc';
import { TfiSearch } from 'react-icons/tfi';
import styles from './SearchBox.module.css';
function ResultSearch({ dataList, setValueInput, setDataList }) {
    const naviagte = useNavigate();
    const handleClickBtn = (type, value) => {
        if (type) {
            return;
        }
        setValueInput(value);
        naviagte(`/search/${value}`);
    };
    const handleClickDelete = (id) => {
        const dataLocalStorage = localStorage.getItem('search_list')
            ? JSON.parse(localStorage.getItem('search_list'))
            : [];
        const arr = [...dataLocalStorage];
        const arr2 = dataList.list;
        const index = arr.findIndex((item) => item.id === id);
        const index2 = arr2.findIndex((item) => item.id === id);
        if (index >= 0) {
            arr.splice(index, 1);
            arr2[index2].keyword = 'Đã xóa đề xuất';
            arr2[index2].type = 'delete';
            const data = { ...dataList, list: arr2 };
            setDataList(data);
            localStorage.setItem('search_list', JSON.stringify(arr));
        }
    };
    return (
        <ul>
            {dataList.list.map((item) => (
                <li key={item.id} className={clsx({ [styles.disabled]: item.type })}>
                    <div
                        className={clsx(styles.btn)}
                        onClick={() => handleClickBtn(item.type, item.keyword)}
                    >
                        <span className={clsx(styles.btnIcon)}>
                            {dataList.type === 'history' ? <VscHistory /> : <TfiSearch />}
                        </span>
                        <span className={clsx(styles.text)}>{item.keyword}</span>
                    </div>
                    {dataList.type === 'history' && (
                        <span
                            className={clsx(styles.delete, { [styles.hidden]: item.type })}
                            onClick={() => handleClickDelete(item.id)}
                        >
                            Xóa
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default ResultSearch;
