import clsx from 'clsx';
import { MdNavigateNext } from 'react-icons/md';
import styles from './MenuSetting.module.css';
function MenuItem({ item, length, active, onClick }) {
    return (
        <div className={clsx(styles.item)} onClick={onClick}>
            <span
                className={clsx(
                    styles.icon,
                    { [styles.children]: length > 1 },
                    { [styles.active]: active },
                )}
            >
                {item.icon}
            </span>
            <span className={clsx(styles.title)}>{item.title}</span>
            {length === 1 && (
                <span className={clsx(styles.value)}>
                    {item.value}
                    {!!item.children && (
                        <span className={clsx(styles.iconNext)}>
                            <MdNavigateNext />
                        </span>
                    )}
                </span>
            )}
        </div>
    );
}

export default MenuItem;
