import clsx from 'clsx';
import styles from './Banner.module.css';
function Banner({ banner, name }) {
    return (
        <>
            {banner ? (
                <div
                    className={clsx(styles.banner)}
                    style={{ backgroundImage: `url(${banner})` }}
                ></div>
            ) : (
                <div className={clsx(styles.noBanner)}>
                    <span>{name}</span>
                </div>
            )}
        </>
    );
}

export default Banner;
