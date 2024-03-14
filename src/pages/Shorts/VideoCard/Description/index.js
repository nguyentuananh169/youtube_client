import { X } from 'react-feather';
import clsx from 'clsx';
import NoAvatar from '../../../../components/NoAvatar';
import useTimeConversion from '../../../../hook/useTimeConversion';
import useNumberConversion from '../../../../hook/useNumberConversion';
import styles from './Description.module.css';
import { Link } from 'react-router-dom';
function Description({ item, handleSetShowDes }) {
    const { date, month, year } = useTimeConversion(item.video_created_at, 'object');
    const views = useNumberConversion(item.video_views, 'compression');
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.heading)}>
                <h3>Nội dung mô tả</h3>
                <div className={clsx(styles.close)} onClick={handleSetShowDes}>
                    <X size={22} />
                </div>
            </div>
            <div className={clsx(styles.body)}>
                <div className={clsx(styles.title)}>
                    <h3>{item.video_title}</h3>
                    <div className={clsx(styles.owner)}>
                        <Link to={`/channel/${item.user_id}/home`}></Link>
                        {item.user_avatar ? (
                            <img src={item.user_avatar} />
                        ) : (
                            <NoAvatar
                                userName={item.user_name}
                                customStyles={{ width: '36px', height: '36px', fontSize: '1.8rem' }}
                            />
                        )}
                        <span className={clsx(styles.name)}>{item.user_name}</span>
                    </div>
                    <div className={clsx(styles.info)}>
                        <div className={clsx(styles.item)}>
                            <strong>{item.video_like}</strong>
                            <p>Lượt thích</p>
                        </div>
                        <div className={clsx(styles.item)}>
                            <strong>{views}</strong>
                            <p>Lượt xem</p>
                        </div>
                        <div className={clsx(styles.item)}>
                            <strong>{`${date} Thg ${month}`}</strong>
                            <p>{year}</p>
                        </div>
                    </div>
                </div>
                <div
                    className={clsx(styles.des)}
                    dangerouslySetInnerHTML={{ __html: item.video_des }}
                ></div>
            </div>
        </div>
    );
}

export default Description;
