import clsx from 'clsx';
import styles from './Title.module.css';
function Title({ content }) {
    return (
        <div className={clsx(styles.title)}>
            <h1>{content}</h1>
        </div>
    );
}

export default Title;
