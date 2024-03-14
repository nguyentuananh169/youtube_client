import { BsDot } from 'react-icons/bs';

import clsx from 'clsx';
import NoAvatar from '../../../../../components/NoAvatar';
import timeConversion from '../../../../../hook/useTimeConversion';
import styles from './Comments.module.css';
function Item({ item }) {
    return (
        <div className={clsx(styles.item)}>
            <div className={clsx(styles.avatar)}>
                {item.user_avatar ? (
                    <img src={item.user_avatar} />
                ) : (
                    <NoAvatar userName={item.user_name} customStyles={{ fontSize: '1.3rem' }} />
                )}
            </div>
            <div className={clsx(styles.body)}>
                <div className={clsx(styles.content)}>
                    <span>{item.user_name}</span>
                    <BsDot size={20} color="#606060" />
                    <span>{timeConversion(item.cmt_created_at, 'ago')}</span>
                </div>
                <div className={clsx(styles.text)}>
                    <span>{item.cmt_content}</span>
                </div>
            </div>
            <div className={clsx(styles.thumbnail, { [styles.short]: item.video_type === '1' })}>
                <div className={clsx(styles.aspectRatio)}>
                    <img src={item.video_poster} />
                </div>
            </div>
        </div>
    );
}

export default Item;
