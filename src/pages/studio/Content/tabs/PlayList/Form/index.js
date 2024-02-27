import { useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useValidateForm } from '../../../../../../hook/useValidateForm';
import Modal from '../../../../components/Modal';
import Body from './Body';
import Bottom from './Bottom';
import playlistApi from '../../../../../../api/playlistApi';
import { addToastMessage } from '../../../../../../store/actions/toastMessage';
import styles from './Form.module.css';
function Form({ modal, dataForm, setDataForm, handleCloseModal, fetchPlaylist }) {
    const validates = [
        {
            name: 'title',
            rules: { isRequired: true, maxLength: 100 },
        },
        {
            name: 'des',
            rules: { maxLength: 500 },
        },
    ];
    const [isLoading, setLoading] = useState(false);
    const distpatch = useDispatch();
    const addPlaylist = async () => {
        setLoading(true);
        const params = new FormData();
        params.append('_title', dataForm.title);
        params.append('_des', dataForm.des);
        const response = await playlistApi.add(params);
        setLoading(false);
        if (response[0].error) {
            distpatch(addToastMessage('error', 'Thất bại', response[0].message));
        } else {
            distpatch(addToastMessage('success', 'Thành công', response[0].message));
            handleCloseModal();
            fetchPlaylist(null, 1);
        }
    };
    const updatePlaylist = async () => {
        setLoading(true);
        const params = new FormData();
        params.append('_id', dataForm.id);
        params.append('_name', dataForm.title);
        params.append('_des', dataForm.des);
        const response = await playlistApi.update(params);
        setLoading(false);
        if (response[0].error) {
            distpatch(addToastMessage('error', 'Thất bại', response[0].message));
        } else {
            distpatch(addToastMessage('success', 'Thành công', response[0].message));
            handleCloseModal();
            fetchPlaylist();
        }
    };
    const handleSubmit = () => {
        if (isLoading) {
            return;
        }
        if (modal.type === 'add_playlist') {
            addPlaylist();
        } else {
            updatePlaylist();
        }
    };
    const { formSubmit, ...objValidateForm } = useValidateForm(validates, handleSubmit);
    return (
        <Modal
            title={`${
                modal.type === 'add_playlist' ? 'Tạo danh sách phát mới' : 'Cập nhật danh sách phát'
            }`}
            handleCloseModal={handleCloseModal}
            customStyle={{
                maxWidth: '577px',
                maxHeight: '510px',
            }}
        >
            <form
                className={clsx(styles.main)}
                onSubmit={(e) => {
                    formSubmit(e, dataForm);
                }}
            >
                <Body
                    dataForm={dataForm}
                    setDatForm={setDataForm}
                    objValidateForm={objValidateForm}
                />
                <Bottom isLoading={isLoading} handleCloseModal={handleCloseModal} />
            </form>
        </Modal>
    );
}

export default Form;
