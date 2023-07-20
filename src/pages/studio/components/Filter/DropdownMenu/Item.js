import clsx from 'clsx';
import styles from './DropdownMenu.module.css';
function Item({ menuLv2, data, title, item, onClick }) {
    const text = menuLv2 ? item.valueText : item.title;
    let checked;
    if (Array.isArray(data)) {
        checked = data.includes(item.valueCode);
    } else {
        checked = data === item.valueCode;
    }
    return (
        <li onClick={onClick}>
            {item.type && (
                <input
                    name="name-input"
                    type={item.type}
                    className={clsx(styles.children)}
                    value={item.valueCode}
                    checked={checked}
                    readOnly="readonly"
                />
            )}
            {item.titleParent ? `${title} (${text})` : text}
        </li>
    );
}

export default Item;
