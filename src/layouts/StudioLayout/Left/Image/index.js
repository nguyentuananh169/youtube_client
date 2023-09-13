import { MdOutlineOpenInNew } from 'react-icons/md';
import { TfiClose } from 'react-icons/tfi';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Tooltip from '../../../../components/Tooltip';
import useStore from '../../../../hook/useStore';
import { setIsToggleNavBar2 } from '../../../../store/actions';
import NoAvatar from '../../../../components/NoAvatar';
import styles from './Image.module.css';
function Image() {
    const [state, dispatch] = useStore();
    const { isToggleNavbar2 } = state;
    return (
        <div className={clsx(styles.wrapper, { [styles.toggleNavbar]: isToggleNavbar2 })}>
            <div className={clsx(styles.close)}>
                <button onClick={() => dispatch(setIsToggleNavBar2())}>
                    <TfiClose />
                </button>
            </div>
            <div className={clsx(styles.img)}>
                <Link to={`/channel/${state.user.user_id}/home`} target="_blank">
                    {state.user.user_avatar ? (
                        <img src={state.user.user_avatar} />
                    ) : (
                        <NoAvatar userName={state.user.user_name} />
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
                <p className={clsx(styles.text)}>{state.user.user_name}</p>
            </div>
        </div>
    );
}

export default Image;
