import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import commentApi from '../../../../api/commentApi';
import NoData from '../../components/NoData';
import Fillter from '../../components/Filter';
import TitlePage from '../../components/TitlePage';
import ItemGroup from '../CommentList/ItemGroup';
import Loading from '../CommentList/ItemGroup/Loading';
import img from '../../../../assets/img/no_content_v3.png';
import styles from './CommentsByVideoId.module.css';
import LoadingHasMore from '../../../../components/LoadingHasMore';
function CommentsByVideoId() {
    const initFilterData = {
        keyword: '',
        question: false,
        sub_public: false,
        response_status: '',
        sub_count: '',
    };
    const initFilterText = {
        keyword: '',
        question: false,
        sub_public: false,
        response_status: '',
        sub_count: '',
    };
    const initMenu = [
        {
            id: '1',
            title: 'Tìm kiếm',
            code: 'keyword',
            valueType: 'text',
            isHidden: false,
            children: {
                code: 'keyword',
                title: 'Tìm kiếm',
                validates: { isRequired: true },
                isComp: true,
            },
        },
        {
            id: '2',
            title: 'Chứa câu hỏi',
            code: 'question',
            isHidden: false,
            valueType: 'boolean',
        },
        {
            id: '3',
            title: 'Người đăng ký công khai',
            code: 'sub_public',
            isHidden: false,
            valueType: 'boolean',
        },
        {
            id: '4',
            title: 'Số người đăng ký',
            code: 'sub_count',
            isHidden: false,
            valueType: 'array_to_string_with_out_commas',
            children: {
                code: 'sub_count',
                title: 'Số người đăng ký',
                validates: { isRequired: true, isInteger: true },
                isComp: true,
                compLv: 2,
                isSelector: true,
            },
        },
        {
            id: '5',
            title: 'Trạng thái phản hồi',
            code: 'response_status',
            isHidden: false,
            valueType: 'text',
            children: {
                code: 'response_status',
                title: 'Trạng thái phản hồi',
                validates: { isRequired: true },
                data: [
                    {
                        id: 'v1',
                        tag: 'input',
                        type: 'radio',
                        valueText: 'Tôi chưa phải hồi',
                        valueCode: 'no_response',
                    },
                    {
                        id: 'v2',
                        tag: 'input',
                        type: 'radio',
                        valueText: 'Tôi phản hồi rồi',
                        valueCode: 'responsed',
                    },
                ],
            },
        },
    ];
    const { videoId } = useParams();
    const isReset = useRef(true);
    const [isLoading, setIsLoading] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        totalPage: 0,
        orderType: 'DESC',
    });
    const fetchComments = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const formData = {
            _get_video_id: videoId,
            _page: isReset.current ? 1 : params.page,
            _limit: params.limit,
            _order_type: params.orderType,
        };
        const response = await commentApi.getByHostUser(formData);
        if (isReset.current) {
            setCommentList(response.commentList);
        } else {
            setCommentList([...commentList, ...response.commentList]);
        }
        setParams({ ...params, page: response.page + 1, totalPage: response.totalPage });
        isReset.current = false;
        setIsLoading(false);
    };
    useEffect(() => {
        if (videoId) {
            isReset.current = true;
            fetchComments();
        }
    }, [videoId, params.orderType]);
    const handleSearch = (data) => {
        console.log(data);
    };
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
        <div className={clsx(styles.wrapper)}>
            <TitlePage text={'Bình luận về video'} />
            <Fillter
                initMenu={initMenu}
                initFilterData={initFilterData}
                initFilterText={initFilterText}
                handleSearch={handleSearch}
            />
            <div className={clsx(styles.fillter)}>
                <select
                    value={params.orderType}
                    onChange={(e) =>
                        setParams({
                            ...params,
                            orderType: e.target.options[e.target.options.selectedIndex].value,
                        })
                    }
                >
                    <option value={'DESC'}>Bình luận mới nhất</option>
                    <option value={'ASC'}>Bình luận cũ nhất</option>
                </select>
            </div>
            {!isReset.current &&
                commentList.map((item, index) => (
                    <ItemGroup
                        key={item.cmt_id}
                        item={item}
                        index={index}
                        handleUpdateCommentSuccess={handleUpdateCommentSuccess}
                        handleDeleteCommentSuccess={handleDeleteCommentSuccess}
                    />
                ))}
            {!isReset.current && params.page <= params.totalPage && (
                <div className={clsx(styles.btnMore)}>
                    <div className={clsx(styles.btn)} onClick={fetchComments}>
                        {isLoading ? <LoadingHasMore /> : 'Xem thêm '}
                    </div>
                </div>
            )}
            {!isLoading && !isReset.current && commentList.length === 0 && (
                <NoData img={img} bodyText="Không có nội dung" />
            )}
            {isLoading &&
                isReset.current &&
                Array(3)
                    .fill(0)
                    .map((item, index) => <Loading key={index} />)}
        </div>
    );
}

export default CommentsByVideoId;
