import { MdOutlineOpenInNew } from 'react-icons/md';
import { TfiClose } from 'react-icons/tfi';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Tooltip from '../../../../components/Tooltip';
import { setIsToggleNavBar2 } from '../../../../store/actions/toggleNavbar';
import NoAvatar from '../../../../components/NoAvatar';
import styles from './Image.module.css';
function Image() {
    const dispatch = useDispatch();
    const isToggleNavbar2 = useSelector((state) => state.toggleNavbar.isToggleNavbar2);
    const user = useSelector((state) => state.auth.user);
    return (
        <div className={clsx(styles.wrapper, { [styles.toggleNavbar]: isToggleNavbar2 })}>
            <div className={clsx(styles.close)}>
                <button onClick={() => dispatch(setIsToggleNavBar2())}>
                    <TfiClose />
                </button>
            </div>
            <div className={clsx(styles.img)}>
                <Link to={`/channel/${user.user_id}/home`} target="_blank">
                    {user.user_avatar ? (
                        <img src={user.user_avatar} />
                    ) : (
                        <NoAvatar userName={user.user_name} />
                    )}

                    <div className={clsx(styles.overlay)}>
                        <MdOutlineOpenInNew fontSize={22} />
                    </div>
                    <Tooltip
                        content={'Xem kênh trên Youtube'}
                        customStyle={{
                            top: '82%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)',
                            whiteSpace: 'nowrap',
                            fontSize: '1.1rem',
                            padding: '5px 7px',
                            fontWeight: '500',
                        }}
                        data-class="tooltip"
                    />
                </Link>
            </div>
            <div className={clsx(styles.name)}>
                <p className={clsx(styles.title)}>Kênh của bạn</p>
                <p className={clsx(styles.text)}>{user.user_name}</p>
            </div>
        </div>
    );
}

export default Image;
