import clsx from 'clsx';
import styles from './FilterSlider.module.css';
function Item({ item, active, onChangeItemId }) {
    return (
        <div className={clsx(styles.item, { [styles.active]: active })}>
            <button onClick={() => onChangeItemId(item.id)}>{item.name}</button>
        </div>
    );
}

export default Item;
