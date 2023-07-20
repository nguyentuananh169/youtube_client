import clsx from 'clsx';
import styles from './Table.module.css';
function Table({ children }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <table>
                <tbody>{children}</tbody>
            </table>
        </div>
    );
}

export default Table;
