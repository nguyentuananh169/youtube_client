import { useNavigate } from 'react-router-dom';
import SelectFile from './SelectFile';
import Form from '../../components/Form';
function VideoForm({ dataForm, setDataForm, modal, setModal, getVideoApi, handleResetDataForm }) {
    const navigate = useNavigate();
    const handleCloseModal = () => {
        handleResetDataForm();
        setModal({ isShow: false, type: '' });
        navigate('/studio/videos/upload');
    };
    const handleSetDataForm = (objData) => {
        setDataForm(objData);
    };

    return (
        <>
            {(modal.type === 'upload_video' && dataForm.videoFile) ||
            modal.type === 'update_video' ? (
                <Form
                    modal={modal}
                    getVideoApi={getVideoApi}
                    dataForm={dataForm}
                    handleCloseModal={handleCloseModal}
                />
            ) : (
                <SelectFile
                    dataForm={dataForm}
                    handleSetDataForm={handleSetDataForm}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </>
    );
}

export default VideoForm;
