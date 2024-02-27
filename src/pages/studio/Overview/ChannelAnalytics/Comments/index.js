import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import commentApi from '../../../../../api/commentApi';
import Card from '../../../components/Card';
import styles from './Comments.module.css';
import Item from './Item';
import Loading from './Loading';
function Comments() {
    const [isLoading, setIsLoading] = useState(true);
    const [commentList, setCommentList] = useState([]);
    useEffect(() => {
        const fetchCommentList = async () => {
            setIsLoading(true);
            const formData = {
                _limit: 3,
            };
            const response = await commentApi.getByHostUser(formData);
            setCommentList(response.commentList);
            setIsLoading(false);
        };
        fetchCommentList();
    }, []);
    return (
        <div className={clsx(styles.wrapper)}>
            {isLoading && (
                <Card title={'Bình luận mới nhất'}>
                    <Loading />
                </Card>
            )}
            {!isLoading && commentList.length > 0 && (
                <Card title={'Bình luận mới nhất'}>
                    {commentList.map((item) => (
                        <Item key={item.cmt_id} item={item} />
                    ))}
                    <div className={clsx(styles.linkBtn)}>
                        <p>
                            <Link to={'/studio/comments'}>Xem thêm</Link>
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
}

export default Comments;
