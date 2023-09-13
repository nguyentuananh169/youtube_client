import clsx from 'clsx';
import img from '../../../../../../assets/img/empty_channel_illustration.png';
import styles from './NoData.module.css';
import { Link } from 'react-router-dom';
function NoData({ icon, heading, text, textLink, link, textBottom, linkBottom, isBtn, textSpan }) {
    return (
        <div className={clsx(styles.wrapper)}>
            {isBtn ? (
                <>
                    <div className={clsx(styles.img)}>
                        <img src={icon || img} />
                    </div>
                    <h3 className={clsx(styles.heading)}>{heading}</h3>
                    <p className={clsx(styles.text)}>{text}</p>
                    <div className={clsx(styles.btn)}>
                        <Link to={link}>{textLink}</Link>
                    </div>
                    <p className={clsx(styles.textBottom)}>
                        {textBottom} <Link to={'#'}>{linkBottom}</Link>
                    </p>
                </>
            ) : (
                <div className={clsx(styles.textSpan)}>
                    <span>{textSpan}</span>
                </div>
            )}
        </div>
    );
}

export default NoData;
