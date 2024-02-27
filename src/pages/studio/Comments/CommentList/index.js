import { useEffect, useState } from 'react';
import clsx from 'clsx';
import commentApi from '../../../../api/commentApi';
import ItemGroup from './ItemGroup';
import Loading from './ItemGroup/Loading';
import LoadingHasMore from '../../../../components/LoadingHasMore';
import NoData from '../.../../../components/NoData';
import styles from './CommentList.module.css';
import imgv3 from '../../../../assets/img/no_content_v3.png';
function CommentsList() {
    const [isLoading, setLoading] = useState(true);
    const [isLoadingFrist, setLoadingFrist] = useState(true);
    const [commentList, setCommentList] = useState([]);
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        totalPage: 1,
    });
    const fetchComments = async () => {
        setLoading(true);
        const formData = {
            _page: params.page,
            _limit: params.limit,
        };
        const response = await commentApi.getByHostUser(formData);
        if (isLoadingFrist) {
            setCommentList(response.commentList);
        } else {
            setCommentList([...commentList, ...response.commentList]);
        }

        setParams({ ...params, page: response.page + 1, totalPage: response.totalPage });
        setLoading(false);
        setLoadingFrist(false);
    };
    useEffect(() => {
        fetchComments();
    }, []);
    const handleUpdateCommentSuccess = (index, content, time) => {
        const cmList = [...commentList];
        cmList[index].cmt_content = content;
        cmList[index].cmt_updated_at = time;
        cmList[index].cmt_edited = true;
        setCommentList(cmList);
    };
    const handleDeleteCommentSuccess = (index) => {
        const arr = [...commentList];
        arr.splice(index, 1);
        setCommentList(arr);
    };
    return (
        <div className={clsx(styles.list)}>
            {isLoading &&
                isLoadingFrist &&
                Array(4)
                    .fill(0)
                    .map((ite, index) => <Loading key={index} />)}

            {commentList.map((item, index) => (
                <ItemGroup
                    key={item.cmt_id}
                    item={item}
                    index={index}
                    handleUpdateCommentSuccess={handleUpdateCommentSuccess}
                    handleDeleteCommentSuccess={handleDeleteCommentSuccess}
                />
            ))}
            {params.page <= params.totalPage && !isLoadingFrist && (
                <div className={clsx(styles.btnMore)}>
                    <div className={clsx(styles.btn)} onClick={fetchComments}>
                        {isLoading ? <LoadingHasMore /> : 'Xem thêm '}
                    </div>
                </div>
            )}
            {!commentList.length && !isLoading && (
                <NoData
                    img={imgv3}
                    bodyText="Không tìm thấy bình luận nào. Hãy thử tìm kiếm nội dung khác hoặc bỏ bộ lọc."
                />
            )}
        </div>
    );
}

export default CommentsList;
