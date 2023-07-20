import clsx from 'clsx';
import styles from './Card.module.css';
function Card({ title, children }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.title)}>
                <h4>{title}</h4>
            </div>
            {children}
        </div>
    );
}

export default Card;
