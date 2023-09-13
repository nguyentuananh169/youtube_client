import { BsDot, BsCheckCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Tooltip from '../../../components/Tooltip';
import Actions from './Actions';
import styles from './Channels.module.css';
import NoAvatar from '../../../components/NoAvatar';
function Item({ item, index, handleClickUnsubscribe }) {
    return (
        <div className={clsx(styles.body)}>
            <Link to={`/channel/${item.user_id}/home`} className={clsx(styles.channel)}>
                <div className={clsx(styles.img)}>
                    {item.user_avatar ? (
                        <img src={item.user_avatar} />
                    ) : (
                        <div style={{ width: '136px', height: '136px', margin: '0 auto' }}>
                            <NoAvatar
                                userName={item.user_name}
                                customStyles={{ fontSize: '6rem' }}
                            />
                        </div>
                    )}
                </div>
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.owner)}>
                        <div className={clsx(styles.name)}>
                            <Tooltip
                                content={item.user_name}
                                customStyle={{
                                    bottom: '100% ',
                                    left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    fontSize: '1.2rem',
                                    whiteSpace: 'nowrap',
                                }}
                            />
                            <span className={clsx(styles.text)}>{item.user_name}</span>
                        </div>
                        <div className={clsx(styles.official)}>
                            <Tooltip
                                content={'Đã xác minh'}
                                customStyle={{
                                    bottom: '100% ',
                                    left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    fontSize: '1.2rem',
                                    whiteSpace: 'nowrap',
                                }}
                            />
                            <BsCheckCircleFill size={13} color="#606060" />
                        </div>
                    </div>
                    <div className={clsx(styles.subscriber)}>
                        <div className={clsx(styles.count1)}>
                            {item.user_total_subscribe} người đăng ký
                        </div>
                        <div className={clsx(styles.icon)}>
                            <BsDot fontSize={14} color="#606060" />
                        </div>
                        <div className={clsx(styles.count2)}>{item.user_total_video} video</div>
                    </div>
                    {item.user_des ? (
                        <div
                            className={clsx(styles.des)}
                            dangerouslySetInnerHTML={{
                                __html: item.user_des,
                            }}
                        ></div>
                    ) : (
                        <div className={clsx(styles.des)}>Kênh này chưa có nội dung giới thiệu</div>
                    )}
                </div>
            </Link>
            <Actions
                userId={item.user_id}
                index={index}
                handleClickUnsubscribe={handleClickUnsubscribe}
            />
        </div>
    );
}

export default Item;
