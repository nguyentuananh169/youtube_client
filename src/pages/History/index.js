import clsx from 'clsx';
import styles from './History.module.css';
import Left from './Left';
import Right from './Right';
function History() {
    return (
        <div className={clsx(styles.wrapper)}>
            <Left />
            <Right />
        </div>
    );
}

export default History;
