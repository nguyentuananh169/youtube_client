import { MdOutlineUpload } from 'react-icons/md';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Modal from '../../../../components/Modal';
import styles from './SelectFile.module.css';
function SelectFile({ dataForm, handleSetDataForm, handleCloseModal }) {
    const [error, setError] = useState('');
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const handleSetFile = (file) => {
        if (isLoading) {
            return;
        }
        if (file.type !== 'video/mp4') {
            return setError('Chỉ được chọn file MP4');
        }
        if (file.size > 31457280) {
            return setError('Kích thước file phải nhỏ hơn 30MB');
        }
        setIsLoading(true);
        const title = file.name.slice(0, -4);
        const videoLink = URL.createObjectURL(file);
        setData({ videoFile: file, title, videoLink });
        setError('');
    };
    const getVideoDimensions = () => {
        if (canvasRef.current && videoRef.current) {
            const videoEl = videoRef.current;
            const canvasEl = canvasRef.current;
            const context = canvasEl.getContext('2d');
            const width = videoEl.clientWidth;
            const height = videoEl.clientHeight;
            canvasRef.current.width = width;
            canvasRef.current.height = height;
            const aspectRatio = width / height;
            if (aspectRatio < 1) {
                // Thời điểm bạn muốn chụp ảnh, tính theo giây
                const timeInSeconds = 0;
                // Đặt thời điểm của video đến thời điểm mong muốn
                videoEl.currentTime = timeInSeconds;
                // Khi video seek đến thời điểm mong muốn, chụp ảnh
                videoEl.onseeked = () => {
                    // Vẽ frame hiện tại lên canvas
                    context.drawImage(videoEl, 0, 0, width, height);
                    // Chuyển đổi canvas thành URL dữ liệu (data URL)
                    const imageDataURL = canvasEl.toDataURL('image/jpeg');
                    handleSetDataForm({
                        ...dataForm,
                        ...data,
                        videoType: 1,
                        posterLink: imageDataURL,
                    });
                };
            } else {
                handleSetDataForm({ ...dataForm, ...data, videoType: 0 });
            }
        }
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
                        {isLoading && <div className={clsx(styles.loading)}></div>}
                    </label>
                    <div className={clsx(styles.error)}>
                        <span>{error}</span>
                    </div>
                    <div className={clsx(styles.text)}>
                        <p>
                            <strong>Chọn video để tải lên</strong>
                        </p>
                        <p>Các video của bạn sẽ ở chế độ riêng tư cho đến khi bạn xuất bản.</p>
                        <p className={clsx(styles.note)}>
                            Video màn hình dọc mặc định là video ngắn
                        </p>
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
                {data.videoLink && (
                    <>
                        <div className={clsx(styles.video)}>
                            <video
                                ref={videoRef}
                                onLoadedMetadata={getVideoDimensions}
                                src={data.videoLink}
                                autoPlay={false}
                                muted={true}
                                controls={false}
                            ></video>
                            <canvas ref={canvasRef} className={clsx(styles.canvas)}></canvas>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
}

export default SelectFile;
