import clsx from 'clsx';
import Button from '../../../../components/Button';
import styles from './FilterCategory.module.css';
function Item({ text, active, index, onChangeNumberActive }) {
    return (
        <div className={clsx(styles.btn, { [styles.active]: active })}>
            <Button onClick={() => onChangeNumberActive(index)}>{text}</Button>
        </div>
    );
}

export default Item;
