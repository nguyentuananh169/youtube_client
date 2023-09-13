import { useState } from 'react';
import clsx from 'clsx';
import Modal from '../../../../components/Modal';
import playlistApi from '../../../../../../api/playlistApi';
import useStore from '../../../../../../hook/useStore';
import { addToastMessage } from '../../../../../../store/actions';
import NoThumbnail from '../../../../../../assets/img/no_thumbnail.jpg';
import styles from './DeleteForm.module.css';
function DeleteForm({ dataForm, handleCloseModal, fetchPlaylist }) {
    const [isCheckBox, setIsCheckBox] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [, distpatch] = useStore();
    const modalStyle = {
        width: 'calc(100vw - 20px)',
        maxWidth: '480px',
        height: 'auto',
        maxHeight: 'calc(100vh - 20px)',
    };
    const deletePlaylistApi = async () => {
        if (isLoading || !isCheckBox) {
            return;
        }
        setIsloading(true);
        const params = { _id: dataForm.id };
        const response = await playlistApi.delete(params);
        setIsloading(false);
        if (response[0].error) {
            return distpatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        distpatch(addToastMessage('success', 'Thành công', response[0].message));
        handleCloseModal();
        fetchPlaylist(null, 1);
    };
    return (
        <Modal
            title="Xóa vĩnh viễn danh sách phát này?"
            handleCloseModal={isLoading ? () => {} : handleCloseModal}
            customStyle={modalStyle}
        >
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.videoInforCn)}>
                    <div className={clsx(styles.videoInfor)}>
                        <div className={clsx(styles.img)}>
                            <img src={dataForm.poster || NoThumbnail} />
                        </div>
                        <div className={clsx(styles.info)}>
                            <strong>{dataForm.title}</strong>
                            <p>{`Ngày tải lên: ${dataForm.created_at}`}</p>
                            <p>{`Số lượng: ${dataForm.totalVideo} video`}</p>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.checkBox)}>
                    <input
                        id="checkboxInput"
                        type="checkbox"
                        onChange={() => setIsCheckBox(!isCheckBox)}
                    />
                    <label htmlFor="checkboxInput">
                        Tôi hiểu rằng danh sách phát sẽ bị xóa vĩnh viễn và không thể khôi phục
                    </label>
                </div>
                <div className={clsx(styles.bottom)}>
                    <button
                        className={clsx({ [styles.disable]: isLoading })}
                        onClick={isLoading ? () => {} : handleCloseModal}
                    >
                        Hủy
                    </button>
                    <button
                        className={clsx({ [styles.disable]: !isCheckBox || isLoading })}
                        onClick={deletePlaylistApi}
                    >
                        {isLoading ? 'Đang xóa' : 'Xóa vĩnh viễn'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteForm;
