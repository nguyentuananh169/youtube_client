import clsx from 'clsx';
import styles from './Community.module.css';
import Card from './Card';
function Community() {
    return (
        <div className={clsx(styles.wrapper)}>
            <Card />
            <Card />
            <Card />
        </div>
    );
}

export default Community;
