import { AiFillCheckCircle } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './UserResults.module.css';
import Tooltip from '../../../../../components/Tooltip';
import NoAvatar from '../../../../../components/NoAvatar';
function Item({ item }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <Link to={`/channel/${item.user_id}/home`} className={clsx(styles.link)}></Link>
            <div className={clsx(styles.avatar)}>
                {item.user_avatar ? (
                    <img src={item.user_avatar} />
                ) : (
                    <div className={clsx(styles.noAvatar)}>
                        <NoAvatar userName={item.user_name} customStyles={{ fontSize: '9rem' }} />
                    </div>
                )}
            </div>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.channel)}>
                    <div className={clsx(styles.name)}>
                        <Link to={`/channel/${item.user_id}/home`}>{item.user_name}</Link>
                        <Tooltip
                            content={item.user_name}
                            customStyle={{
                                bottom: '100%',
                                left: '50%',
                                whiteSpace: 'nowrap',
                                transform: 'translate(-50%,-50%)',
                            }}
                        />
                    </div>
                    <div className={clsx(styles.offical)}>
                        <Link to={`/channel/${item.user_id}/home`}>
                            <AiFillCheckCircle size={14} color="#606060" />
                        </Link>
                        <Tooltip
                            content={'Đã xác minh'}
                            customStyle={{
                                bottom: 'calc(100% + 3px)',
                                left: '50%',
                                whiteSpace: 'nowrap',
                                transform: 'translate(-50%,-50%)',
                            }}
                        />
                    </div>
                </div>
                <div className={clsx(styles.metadata)}>
                    <p className={clsx(styles.tag)}>
                        {item.user_tag} <BsDot /> {item.user_total_subscribe} người đăng ký
                    </p>
                    <p
                        className={clsx(styles.des)}
                        dangerouslySetInnerHTML={{
                            __html: item.user_des,
                        }}
                    ></p>
                </div>
            </div>
        </div>
    );
}

export default Item;
