import clsx from 'clsx';
import styles from './Comments.module.css';
import CommentList from './components/CommentList';
import Filter from './components/Filter';
import Form from './components/Form';
function Comments() {
    return (
        <div className={clsx(styles.wrapper)}>
            <Filter />
            <Form />
            <CommentList />
        </div>
    );
}

export default Comments;
