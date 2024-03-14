import clsx from 'clsx';
import styles from './NoResult.module.css';
import img from '../../assets/img/no-search-found.png';
function NoResult({ icon, text = '', customStyles = {} }) {
    return (
        <div className={clsx(styles.wrapper)} style={{ ...customStyles }}>
            <img src={icon || img} />
            <p className={clsx(styles.text)}>{text}</p>
        </div>
    );
}

export default NoResult;
