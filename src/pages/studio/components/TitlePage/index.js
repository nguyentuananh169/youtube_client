import clsx from 'clsx';
import styles from './TitlePage.module.css';
function TitlePage({ text }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <h3>{text}</h3>
        </div>
    );
}

export default TitlePage;
