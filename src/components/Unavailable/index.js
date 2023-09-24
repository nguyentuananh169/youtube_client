import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Unavailable.module.css';
function Unavailable({ img, title, text, linkUrl, linkText }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.img)}>
                <div className={clsx(styles.aspectRatio)}>
                    <img src={img} />
                </div>
            </div>
            <div className={clsx(styles.title)}>
                <h3>{title}</h3>
            </div>
            <div className={clsx(styles.text)}>
                <span>{text}</span>
            </div>
            <div className={clsx(styles.btn)}>
                <Link to={linkUrl}>{linkText}</Link>
            </div>
        </div>
    );
}

export default Unavailable;
