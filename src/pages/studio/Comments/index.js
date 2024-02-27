import clsx from 'clsx';
import TitlePage from '../components/TitlePage';
import Fillter from '../components/Filter';
import styles from './Comments.module.css';
import CommentList from './CommentList';
function Comments() {
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
    const handleSearch = (data) => {
        console.log(data);
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <TitlePage text={'Bình luận trên kênh'} />
            <Fillter
                initMenu={initMenu}
                initFilterData={initFilterData}
                initFilterText={initFilterText}
                handleSearch={handleSearch}
            />
            <CommentList />
        </div>
    );
}

export default Comments;
