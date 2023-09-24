import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Comments from '../Watch/components/Comments';
import NoResult from '../../components/NoResult';
import postsApi from '../../api/postsApi';
import styles from './Post.module.css';
import Card from '../Channel/components/Main/Community/Card';
import { useState } from 'react';
import queryString from 'query-string';
import LoadingHasMore from '../../components/LoadingHasMore';

function Post() {
    const { search } = useLocation();
    const urlParams = queryString.parse(search);
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const handleFetchPost = async () => {
            setIsLoading(true);
            const params = {
                _type: 'get_by_id',
                _id: urlParams.id,
            };
            const response = await postsApi.get(params);
            setIsLoading(false);
            if (response.postsList.length > 0) {
                setPost(response.postsList[0]);
            }
        };
        handleFetchPost();
    }, [urlParams.id]);
    return (
        <div className={clsx(styles.wrapper)}>
            {isLoading && <LoadingHasMore />}
            <div className={clsx(styles.card)}>{post?.post_id && <Card item={post} />}</div>
            <div className={clsx(styles.comments)}>
                {post?.post_id && (
                    <Comments
                        isPostsPage
                        ownerId={post.user_id}
                        ownerName={post.user_name}
                        ownerAvatar={post.user_avatar}
                        loadingPage={false}
                    />
                )}
            </div>
            {!isLoading && !post?.post_id && (
                <NoResult text="Bài viết không có sẵn hoặc đã bị xóa" />
            )}
        </div>
    );
}

export default Post;
