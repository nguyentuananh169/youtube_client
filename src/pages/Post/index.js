import clsx from 'clsx';
import Comments from '../Watch/components/Comments';
import Card from '../Channel/components/Main/Community/Card';
import styles from './Post.module.css';

function Post() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.card)}>
                <Card />
            </div>
            <div className={clsx(styles.comments)}>
                <Comments />
            </div>
        </div>
    );
}

export default Post;
