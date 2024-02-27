import { IoWarningOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import Modal from '../../../../components/Modal';
import Body from './Body';
import { useValidateForm } from '../../../../../../hook/useValidateForm';
import categoryApi from '../../../../../../api/categoryApi';
import playlistApi from '../../../../../../api/playlistApi';
import videoApi from '../../../../../../api/videoApi';
import cloudinaryApi from '../../../../../../api/cloudinaryApi';
import { addToastMessage } from '../../../../../../store/actions/toastMessage';
import Error from './Error';
import styles from './Form.module.css';

function Form({ modal, dataForm, handleCloseModal, getVideoApi }) {
    const validates = [
        {
            name: 'title',
            rules: { isRequired: true, maxLength: 100 },
        },
        {
            name: 'desText',
            rules: { maxLength: 3000 },
        },
        {
            name: 'posterFile',
            rules: { isRequired: true, isFileImg: true },
        },
        {
            name: 'categoryId',
            rules: { isRequired: true },
        },
    ];
    if (modal.type === 'update_video') {
        validates[2] = {
            name: 'posterFile',
            rules: { isFileImg: true },
        };
    }

    const [values, setValues] = useState(dataForm);
    const [isLoadingCate, setIsLoadingCate] = useState(false);
    const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const distpatch = useDispatch();
    const handleAddVideo = async () => {
        setIsLoadingSubmit(true);
        try {
            const response1 = await cloudinaryApi.upload(values.videoFile);
            const link = response1.url;
            const duration = response1.duration;
            const params = new FormData();
            params.append('_category', values.categoryId);
            params.append('_playlist', values.playlistId);
            params.append('_link_video', link);
            params.append('_poster', values.posterFile[0]);
            params.append('_title', values.title);
            params.append('_des', values.des);
            params.append('_duration', duration);
            const response2 = await videoApi.add(params);
            if (response2[0].error) {
                distpatch(addToastMessage('error', 'Thất bại', response2[0].message));
            } else {
                distpatch(addToastMessage('success', 'Thành công', response2[0].message));
                handleCloseModal();
                getVideoApi();
            }
        } catch (error) {
            distpatch(addToastMessage('error', 'Thất bại', 'Video tải lên thất bại'));
        }
        setIsLoadingSubmit(false);
    };
    const handleUpdateVideo = async () => {
        setIsLoadingSubmit(true);
        const params = new FormData();
        params.append('_id', values.id);
        params.append('_playlist_id', values.playlistId);
        params.append('_category_id', values.categoryId);
        params.append('_poster', values.posterFile[0]);
        params.append('_title', values.title);
        params.append('_des', values.des);
        const response = await videoApi.update(params);
        if (response[0].error) {
            distpatch(addToastMessage('error', 'Thất bại', response[0].message));
        } else {
            distpatch(addToastMessage('success', 'Thành công', response[0].message));
            handleCloseModal();
            getVideoApi();
        }
        setIsLoadingSubmit(false);
    };
    const handleSubmit = () => {
        if (isLoadingSubmit) {
            return;
        }
        if (modal.type === 'upload_video') {
            handleAddVideo();
        } else if (modal.type === 'update_video') {
            handleUpdateVideo();
        }
    };
    const { formSubmit, ...objValidateForm } = useValidateForm(validates, handleSubmit);
    useEffect(() => {
        const getAllCategory = async () => {
            setIsLoadingCate(true);
            const response = await categoryApi.get();
            setIsLoadingCate(false);
            setCategoryList(response);
        };
        const getAllPlaylist = async () => {
            setIsLoadingPlaylist(true);
            const obj = {
                type: 'get_by_token',
            };
            const response = await playlistApi.get(obj);
            setIsLoadingPlaylist(false);
            setPlaylist(response.playlist);
        };

        getAllCategory();
        getAllPlaylist();
    }, []);
    return (
        <Modal title={dataForm.title} handleCloseModal={handleCloseModal}>
            <form className={clsx(styles.wrapper)} onSubmit={(e) => formSubmit(e, values)}>
                <div className={clsx(styles.body)}>
                    {modal.type === 'update_video' && !values.id ? (
                        <Error />
                    ) : (
                        <Body
                            isLoadingCate={isLoadingCate}
                            isLoadingPlaylist={isLoadingPlaylist}
                            isLoadingSubmit={isLoadingSubmit}
                            categoryList={categoryList}
                            playlist={playlist}
                            values={values}
                            setValues={setValues}
                            objValidateForm={objValidateForm}
                        />
                    )}
                </div>
                <div className={clsx(styles.bottom)}>
                    {isLoadingSubmit && (
                        <span className={clsx(styles.text)}>
                            Sẽ mất chút thời gian. Vui lòng đợi ...
                        </span>
                    )}
                    {modal.type === 'update_video' && !values.id ? (
                        <div className={clsx(styles.error)}>
                            <IoWarningOutline size={17} color="#c00" />
                            <span>Chúng tôi gặp phải vấn đề không mong muốn</span>
                        </div>
                    ) : (
                        <button className={clsx(styles.btn, { [styles.loading]: isLoadingSubmit })}>
                            {isLoadingSubmit ? 'Đang lưu...' : 'Lưu'}
                        </button>
                    )}
                </div>
            </form>
        </Modal>
    );
}

export default Form;
