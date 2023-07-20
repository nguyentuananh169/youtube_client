import clsx from 'clsx';
import Left from './Left';
import Right from './Right';
import styles from './Liked.module.css';
function Liked() {
    return (
        <div className={clsx(styles.wrapper)}>
            <Left />
            <Right />
        </div>
    );
}

export default Liked;
