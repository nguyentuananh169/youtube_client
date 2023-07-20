import clsx from 'clsx';
import UserMenu from '../../../../../components/UserMenu';
import Tooltip from '../../../../../components/Tooltip';
import styles from './User.module.css';
function User() {
    return (
        <div className={clsx(styles.wrapper)}>
            <Tooltip
                data-class={'tooltip'}
                content={'Tài khoản'}
                customStyle={{
                    top: 'calc(100% + 19px)',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    whiteSpace: 'nowrap',
                    fontSize: '1rem',
                    padding: '5px 7px',
                }}
            />
            <UserMenu />
        </div>
    );
}

export default User;
