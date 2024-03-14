import { useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import Modal from '../../../../components/Modal';
import videoApi from '../../../../../../api/videoApi';
import { addToastMessage } from '../../../../../../store/actions/toastMessage';
import numberConversion from '../../../../../../hook/useNumberConversion';
import styles from './DeleteForm.module.css';
function DeleteForm({ dataForm, handleResetDataForm, setModal, getVideoApi }) {
    const [isCheckBox, setIsCheckBox] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const distpatch = useDispatch();
    const handleCloseModal = () => {
        handleResetDataForm();
        setModal({ isShow: false, type: '' });
    };
    const modalStyle = {
        width: 'calc(100vw - 20px)',
        maxWidth: '480px',
        height: 'auto',
        maxHeight: 'calc(100vh - 20px)',
    };
    const deleteVideoApi = async () => {
        if (isLoading || !isCheckBox) {
            return;
        }
        setIsloading(true);
        const params = {
            _id: dataForm.id,
            _public_id: dataForm.public_id,
        };
        const response = await videoApi.delete(params);
        setIsloading(false);
        if (response[0].error) {
            return distpatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        distpatch(addToastMessage('success', 'Thành công', response[0].message));
        handleCloseModal();
        getVideoApi();
    };
    return (
        <Modal
            title="Xóa vĩnh viễn video này?"
            handleCloseModal={isLoading ? () => {} : handleCloseModal}
            customStyle={modalStyle}
        >
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.videoInforCn)}>
                    <div className={clsx(styles.videoInfor)}>
                        <div
                            className={clsx(styles.img, {
                                [styles.short]: dataForm.videoType === '1',
                            })}
                        >
                            <div className={clsx(styles.aspectRatio)}>
                                <img src={dataForm.posterLink} />
                            </div>
                        </div>
                        <div className={clsx(styles.info)}>
                            <strong>{dataForm.title}</strong>
                            <p>{`Ngày tải lên: ${dataForm.created_at}`}</p>
                            <p>{`${numberConversion(dataForm.views, 'commas')} lượt xem`}</p>
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
                        Tôi hiểu rằng video và các dữ liệu liên quan (bình luận, lượt thích,...) sẽ
                        bị xóa vĩnh viễn và không thể khôi phục
                    </label>
                </div>
                {isLoading && (
                    <div className={clsx(styles.loading)}>
                        <span>Đang xóa video. Vui lòng đợi...</span>
                    </div>
                )}
                <div className={clsx(styles.bottom)}>
                    <button
                        className={clsx({ [styles.disable]: isLoading })}
                        onClick={isLoading ? () => {} : handleCloseModal}
                    >
                        Hủy
                    </button>
                    <button
                        className={clsx({ [styles.disable]: !isCheckBox || isLoading })}
                        onClick={deleteVideoApi}
                    >
                        Xóa vĩnh viễn
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteForm;
