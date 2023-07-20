import clsx from 'clsx';
import styles from './NoData.module.css';
import { Link } from 'react-router-dom';
function NoData({
    img = '',
    bodyText = '',
    bottomText = '',
    bottomLink = '#',
    isBottomBtn = false,
}) {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.img)}>
                <img src={img} />
            </div>
            <div className={clsx(styles.text)}>
                <span>{bodyText}</span>
            </div>
            <div className={clsx(styles.link, { [styles.btn]: isBottomBtn })}>
                <Link to={bottomLink}>{bottomText}</Link>
            </div>
        </div>
    );
}

export default NoData;
