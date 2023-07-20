import clsx from 'clsx';
import styles from './FilterSlider.module.css';
function Item({ text, index, active, onChangeNumberActive }) {
    return (
        <div className={clsx(styles.item, { [styles.active]: active })}>
            <button onClick={() => onChangeNumberActive(index)}>{text}</button>
        </div>
    );
}

export default Item;
