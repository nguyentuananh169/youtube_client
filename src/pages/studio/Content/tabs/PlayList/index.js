import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import queryString from 'query-string';
import NoData from '../../../components/NoData';
import Filter from '../../../components/Filter';
import imgV3 from '../../../../../assets/img/no_content_v3.png';
import Form from './Form';
import Table from '../components/Table';
import TableTop from './TableTop';
import playlistApi from '../../../../../api/playlistApi';
import { addToastMessage } from '../../../../../store/actions/toastMessage';
import Loading from './Loading';
import Item from './Item';
import TableBottom from './TableBottom';
import DeleteForm from './DeleteForm';
import Videos from './Videos';
import styles from './PlayList.module.css';
function PlayList({ tab }) {
    const initFilterData = {
        title: '',
    };
    const initFilterText = {
        title: '',
    };
    const initMenu = [
        {
            id: '1',
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
    const [playlist, setPlaylist] = useState([]);
    const [modal, setModal] = useState({
        isShow: false,
        type: '',
    });
    const [dataForm, setDataForm] = useState({
        id: '',
        title: '',
        des: '',
    });
    const [params, setParams] = useState({
        limit: 10,
        page: 1,
        totalPage: 1,
    });
    const { search } = useLocation();
    const navigate = useNavigate();
    const distpatch = useDispatch();
    const handleResetDataForm = () => {
        setDataForm({
            id: '',
            title: '',
            des: '',
        });
    };
    const handleCloseModal = () => {
        handleResetDataForm();
        setModal({ isShow: false, type: '' });
        navigate('/studio/videos/playlist');
    };
    const fetchPlaylist = async (limitValue, pageValue) => {
        setIsLoading(true);
        const obj = {
            type: 'get_by_token',
            page: pageValue || params.page,
            limit: limitValue || params.limit,
        };
        const response = await playlistApi.get(obj);
        setIsLoading(false);
        setIsLoadingFirst(false);
        if (response[0]?.error) {
            distpatch(addToastMessage('error', 'Thất bại', response[0].message));
        } else {
            setParams({
                page: response.page,
                limit: response.limit,
                totalPage: response.totalPage,
            });
            setPlaylist(response.playlist);
        }
    };
    const handleClickBtnUpdate = (item) => {
        setDataForm({
            ...dataForm,
            id: item.playlist_id,
            title: item.playlist_name,
            des: item.playlist_des,
        });
        navigate('/studio/videos/playlist?type=update_playlist');
    };
    const handleClickBtnDelete = (item) => {
        setDataForm({
            ...dataForm,
            id: item.playlist_id,
            poster: item.video_poster,
            title: item.playlist_name,
            created_at: item.playlist_created_at,
            totalVideo: item.total_video,
            des: item.playlist_des,
        });
        setModal({ isShow: true, type: 'delete_playlist' });
    };
    const handleClickBtnShow = (id) => {
        setDataForm({
            ...dataForm,
            id,
        });
        setModal({ isShow: true, type: 'show_playlist' });
    };
    const handleChangeLimit = (value) => {
        fetchPlaylist(value, 1);
    };
    const handleChangepage = (value) => {
        fetchPlaylist(null, value);
    };
    useEffect(() => {
        if (tab === 'playlist' && isLoadingFirst) {
            fetchPlaylist();
        }
    }, [tab, isLoadingFirst]);
    useEffect(() => {
        const { type } = queryString.parse(search);
        switch (type) {
            case 'add_playlist':
                setModal({ isShow: true, type: 'add_playlist' });
                break;
            case 'update_playlist':
                setModal({ isShow: true, type: 'update_playlist' });
                break;
            default:
                break;
        }
    }, [search]);
    return (
        <div className={clsx(styles.wrapper)}>
            {modal.isShow && modal.type === 'show_playlist' && (
                <Videos playlistId={dataForm.id} handleCloseModal={handleCloseModal} />
            )}
            {modal.isShow &&
                (modal.type === 'add_playlist' || modal.type === 'update_playlist') && (
                    <Form
                        modal={modal}
                        dataForm={dataForm}
                        setDataForm={setDataForm}
                        handleCloseModal={handleCloseModal}
                        fetchPlaylist={fetchPlaylist}
                    />
                )}
            {modal.isShow && modal.type === 'delete_playlist' && (
                <DeleteForm
                    setModal={setModal}
                    dataForm={dataForm}
                    setDataForm={setDataForm}
                    handleCloseModal={handleCloseModal}
                    fetchPlaylist={fetchPlaylist}
                />
            )}
            <Filter
                initMenu={initMenu}
                initFilterData={initFilterData}
                initFilterText={initFilterText}
                tab={tab}
            />
            <div className={clsx(styles.body)}>
                {(playlist.length > 0 || isLoading) && (
                    <Table>
                        <TableTop tab={tab} />
                        {isLoading && <Loading count={5} />}
                        {!isLoading &&
                            playlist.map((item) => (
                                <Item
                                    key={item.playlist_id}
                                    item={item}
                                    tab={tab}
                                    handleClickBtnUpdate={handleClickBtnUpdate}
                                    handleClickBtnDelete={handleClickBtnDelete}
                                    handleClickBtnShow={handleClickBtnShow}
                                />
                            ))}
                        {!isLoading && playlist.length > 0 && (
                            <TableBottom
                                params={params}
                                handleChangeLimit={handleChangeLimit}
                                handleChangepage={handleChangepage}
                            />
                        )}
                    </Table>
                )}
                {!playlist.length && !isLoading && (
                    <NoData
                        img={imgV3}
                        bodyText="Hãy tạo danh sách phát rồi thêm những nội dung hiện có hoặc tải video mới lên."
                        bottomText="Danh sách phát mới"
                        isBottomBtn
                        bottomLink="?type=add_playlist"
                    />
                )}
            </div>
        </div>
    );
}

export default PlayList;
