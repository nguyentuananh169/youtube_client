import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Tabs.module.css';
import useClickOutSide from '../../../../hook/useClickOutSide';
function Search({ icon }) {
    const [valueInput, setValueInput] = useState('');
    const [elementRef, isShow, setShow] = useClickOutSide();
    const navigate = useNavigate();
    const params = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/channel/${params.id}/search?query=${valueInput}`);
    };
    return (
        <form ref={elementRef} className={clsx(styles.form, styles.tab)} onSubmit={handleSubmit}>
            <label htmlFor="idInput" onClick={() => setShow(true)}>
                {icon}
            </label>
            <div className={clsx(styles.input, { [styles.show]: isShow || valueInput })}>
                <input
                    id="idInput"
                    placeholder="Tìm kiếm"
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                />
            </div>
        </form>
    );
}

export default Search;
