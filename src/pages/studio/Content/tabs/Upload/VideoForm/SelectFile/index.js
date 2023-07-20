import { MdOutlineUpload } from 'react-icons/md';
import clsx from 'clsx';
import styles from './SelectFile.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../../../../../components/Modal';
function SelectFile({ dataForm, handleSetDataForm, handleCloseModal }) {
    const [error, setError] = useState('');
    const handleSetFile = (file) => {
        if (file.type !== 'video/mp4') {
            return setError('Chỉ được chọn file MP4');
        }
        if (file.size >= 60000000) {
            return setError('Kích thước file phải nhỏ hơn 60MB');
        }
        const title = file.name.slice(0, -4);
        const videoLink = URL.createObjectURL(file);
        handleSetDataForm({ ...dataForm, videoFile: file, title: title, videoLink });
        setError('');
    };
    return (
        <Modal title={'Tải video lên'} handleCloseModal={handleCloseModal}>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.body)}>
                    <input
                        id="select-file"
                        className={clsx(styles.input)}
                        type="file"
                        value={dataForm.file}
                        onChange={(e) => handleSetFile(e.target.files[0])}
                    />
                    <label className={clsx(styles.btn1)} htmlFor="select-file">
                        <MdOutlineUpload size={80} color="#909090" />
                    </label>
                    <div className={clsx(styles.error)}>
                        <span>{error}</span>
                    </div>
                    <div className={clsx(styles.text)}>
                        <p>
                            <strong>Chọn video để tải lên</strong>
                        </p>
                        <p>Các video của bạn sẽ ở chế độ riêng tư cho đến khi bạn xuất bản.</p>
                    </div>
                    <label className={clsx(styles.btn2)} htmlFor="select-file">
                        Chọn tệp
                    </label>
                </div>
                <div className={clsx(styles.bottom)}>
                    <p>
                        Khi gửi video lên YouTube, bạn xác nhận rằng bạn đồng ý với{' '}
                        <Link to={'#'}>Điều khoản dịch vụ</Link> và{' '}
                        <Link to={'#'}>Nguyên tắc cộng đồng</Link> của YouTube.
                    </p>
                    <p>
                        Bạn cần đảm bảo không vi phạm bản quyền hoặc quyền riêng tư của người khác.{' '}
                        <Link to={'#'}>Tìm hiểu thêm</Link>
                    </p>
                </div>
            </div>
        </Modal>
    );
}

export default SelectFile;
