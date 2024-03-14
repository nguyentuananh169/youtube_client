import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import Filter from '../../../components/Filter';
import Table from '../components/Table';
import TableTop from './TableTop';
import TableBottom from './TableBottom';
import imgv1 from '../../../../../assets/img/no_content_v1.png';
import NoData from '../../../components/NoData';
import VideoForm from './VideoForm';
import queryString from 'query-string';
import videoApi from '../../../../../api/videoApi';
import Loading from './Loading';
import Item from './Item';
import DeleteForm from '../components/DeleteForm';
import styles from './Upload.module.css';
function Upload({ tab }) {
    const initFilterData = {
        copyright: false,
        visibility: [],
        mfk_restrictions: [],
        age_restricted: '',
        description: '',
        views: '',
        title: '',
    };
    const initFilterText = {
        copyright: false,
        visibility: [],
        mfk_restrictions: [],
        age_restricted: '',
        description: '',
        views: '',
        title: '',
    };
    const initMenu = [
        {
            id: '1',
            title: 'Bản quyền',
            code: 'copyright',
            valueText: 'Bản quyền',
            isHidden: false,
            valueType: 'boolean',
        },
        {
            id: '2',
            title: 'Chế độ hiển thị',
            code: 'visibility',
            isHidden: false,
            valueType: 'array_to_string_with_commas',
            children: {
                code: 'visibility',
                title: 'Chế độ hiển thị',
                validates: { isRequired: true },
                data: [
                    {
                        id: 'v1',
                        tag: 'input',
                        type: 'checkBox',
                        valueText: 'Công khai',
                        valueCode: 'public',
                    },
                    {
                        id: 'v2',
                        tag: 'input',
                        type: 'checkBox',
                        valueText: 'Riêng tư',
                        valueCode: 'private',
                    },
                    {
                        id: 'v3',
                        tag: 'input',
                        type: 'checkBox',
                        valueText: 'Không công khai',
                        valueCode: 'unlisted',
                    },
                    {
                        id: 'v4',
                        tag: 'input',
                        type: 'checkBox',
                        valueText: 'Đã đặt lịch',
                        valueCode: 'has_schedule',
                    },
                    {
                        id: 'v5',
                        tag: 'input',
                        type: 'checkBox',
                        valueText: 'Bản nháp',
                        valueCode: 'draft',
                    },
                ],
            },
        },
        {
            id: '3',
            title: 'Dành cho trẻ em',
            code: 'mfk_restrictions',
            isHidden: false,
            valueType: 'array_to_string_with_commas',
            children: {
                code: 'mfk_restrictions',
                title: 'Dành cho trẻ em',
                validates: { isRequired: true },
                data: [
                    {
                        id: 'm1',
                        tag: 'input',
                        type: 'checkBox',
                        titleParent: true,
                        valueText: 'Do bạn đặt',
                        valueCode: 'mfk_set_by_you',
                    },
                    {
                        id: 'm2',
                        tag: 'input',
                        type: 'checkBox',
                        titleParent: true,
                        valueText: 'Do Youtube đặt',
                        valueCode: 'mfk_set_by_youtube',
                    },
                    {
                        id: 'm3',
                        tag: 'input',
                        type: 'checkBox',
                        valueText: 'Không dành cho trẻ em',
                        valueCode: 'not_made_for_kids',
                    },
                    {
                        id: 'm4',
                        tag: 'input',
                        type: 'checkBox',
                        valueText: 'Chưa đặt',
                        valueCode: 'no_selection',
                    },
                ],
            },
        },
        {
            id: '4',
            title: 'Giới hạn về độ tuổi',
            code: 'age_restricted',
            isHidden: false,
            valueType: 'text',
            children: {
                code: 'age_restricted',
                title: 'Giới hạn về độ tuổi',
                validates: { isRequired: true },
                data: [
                    {
                        id: 'as1',
                        tag: 'input',
                        type: 'radio',
                        valueText: 'Người xem trên 18 tuổi',
                        valueCode: 'age_restricted',
                    },
                    {
                        id: 'as2',
                        tag: 'input',
                        type: 'radio',
                        valueText: 'Không có giới hạn',
                        valueCode: 'not_age_restricted',
                    },
                ],
            },
        },
        {
            id: '5',
            title: 'Mô tả',
            code: 'description',
            isHidden: false,
            valueType: 'text',
            children: {
                code: 'description',
                title: 'Mô tả',
                validates: { isRequired: true },
                isComp: true,
            },
        },
        {
            id: '6',
            title: 'Số lượt xem',
            code: 'views',
            isHidden: false,
            valueType: 'array_to_string_with_out_commas',
            children: {
                code: 'views',
                title: 'Số lượt xem',
                validates: { isRequired: true, isInteger: true },
                isComp: true,
                isSelector: true,
                compLv: 2,
            },
        },
        {
            id: '7',
            title: 'Tiêu đề',
            code: 'title',
            isHidden: false,
            valueType: 'text',
            children: {
                code: 'title',
                title: 'Tiêu đề',
                validates: { isRequired: true },
                isComp: true,
            },
        },
    ];
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFirst, setIsLoadingFirst] = useState(true);
    const [modal, setModal] = useState({
        isShow: false,
        type: '',
    });
    const [videoList, setVideoList] = useState([]);
    const [params, setParams] = useState({
        type: 'get_by_token',
        videoType: 0,
        page: 1,
        totalPage: 1,
        limit: 10,
    });
    const [dataForm, setDataForm] = useState({
        id: '',
        des: '',
        title: '',
        desText: '',
        videoFile: '',
        videoType: '0',
        videoLink: '',
        posterFile: '',
        posterLink: '',
        playlistId: '',
        categoryId: '',
        created_at: '',
        views: '',
        duration: '',
    });
    const { search } = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (tab === 'upload') {
            const { type } = queryString.parse(search);
            switch (type) {
                case 'upload_video':
                    setModal({ isShow: true, type: 'upload_video' });
                    break;
                case 'update_video':
                    setModal({ isShow: true, type: 'update_video' });
                    break;
                default:
                    break;
            }
        }
    }, [search, tab]);
    useEffect(() => {
        if (tab === 'upload' && isLoadingFirst) {
            getVideoApi();
        }
    }, [tab, isLoadingFirst]);
    const getVideoApi = async (valuePage, valueLimit, objParams) => {
        setIsLoading(true);
        const obj = {
            video_type: params.videoType,
            type: params.type,
            page: valuePage || params.page,
            limit: valueLimit || params.limit,
        };
        const response = await videoApi.get(obj);
        setParams({
            ...params,
            page: response.page,
            totalPage: response.totalPage,
            limit: response.limit,
        });
        setVideoList(response.videoList);
        setIsLoading(false);
        setIsLoadingFirst(false);
    };
    const handleResetDataForm = () => {
        setDataForm({
            id: '',
            title: '',
            des: '',
            desText: '',
            videoFile: '',
            videoLink: '',
            videoType: '0',
            posterFile: '',
            posterLink: '',
            playlistId: '',
            categoryId: '',
            created_at: '',
            views: '',
            duration: '',
        });
    };
    const handleClickBtnUpdate = (item) => {
        setDataForm({
            ...dataForm,
            id: item.video_id,
            title: item.video_title,
            des: item.video_des,
            videoLink: item.video_link,
            posterLink: item.video_poster,
            playlistId: item.playlist_id,
            categoryId: item.category_id,
        });
        navigate('/studio/videos/upload?type=update_video');
    };
    const handleClickBtnDelete = (item) => {
        setDataForm({
            ...dataForm,
            id: item.video_id,
            public_id: item.video_public_id,
            posterLink: item.video_poster,
            title: item.video_title,
            created_at: item.video_created_at,
            views: item.video_views,
            duration: item.video_duration,
        });
        setModal({ isShow: true, type: 'delete_video' });
    };
    const handleChangeLimit = (value) => {
        getVideoApi(1, value);
    };
    const handleChangePage = (value) => {
        getVideoApi(value, null);
    };
    const handleSearch = (data) => {
        console.log(data);
    };
    return (
        <>
            <Filter
                initMenu={initMenu}
                initFilterData={initFilterData}
                initFilterText={initFilterText}
                isLoading={isLoading}
                handleSearch={handleSearch}
                tab={tab}
            />
            {modal.isShow && modal.type !== 'delete_video' && (
                <VideoForm
                    dataForm={dataForm}
                    setDataForm={setDataForm}
                    modal={modal}
                    setModal={setModal}
                    getVideoApi={getVideoApi}
                    handleResetDataForm={handleResetDataForm}
                />
            )}

            {modal.isShow && modal.type === 'delete_video' && (
                <DeleteForm
                    dataForm={dataForm}
                    handleResetDataForm={handleResetDataForm}
                    setModal={setModal}
                    getVideoApi={getVideoApi}
                />
            )}
            <div className={clsx(styles.body)}>
                {(videoList.length || isLoading) && (
                    <Table>
                        <TableTop tab={tab} handleRefresh={getVideoApi} />
                        {isLoading && <Loading count={5} />}
                        {!isLoading &&
                            videoList.map((item) => (
                                <Item
                                    key={item.video_id}
                                    item={item}
                                    tab={tab}
                                    handleClickBtnUpdate={handleClickBtnUpdate}
                                    handleClickBtnDelete={handleClickBtnDelete}
                                />
                            ))}
                        {!isLoading && (
                            <TableBottom
                                params={params}
                                handleChangeLimit={handleChangeLimit}
                                handleChangePage={handleChangePage}
                            />
                        )}
                    </Table>
                )}
                {!videoList.length && !isLoading && (
                    <NoData
                        img={imgv1}
                        bodyText="Không có nội dung"
                        bottomText="Tải video lên"
                        isBottomBtn
                        bottomLink="/studio/videos/upload?type=upload_video"
                    />
                )}
            </div>
        </>
    );
}

export default Upload;
