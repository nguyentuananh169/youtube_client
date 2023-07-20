import clsx from 'clsx';
import Suport from './Suport';
import CreateContent from './CreateContent';
import User from './User';
import styles from './Actions.module.css';
function Actions() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.suport)}>
                <Suport />
            </div>
            <div className={clsx(styles.createContent)}>
                <CreateContent />
            </div>
            <div className={clsx(styles.user)}>
                <User />
            </div>
        </div>
    );
}

export default Actions;
