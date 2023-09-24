import { useEffect } from 'react';
import clsx from 'clsx';
import styles from './ConfirmationDialog.module.css';
function ConfirmationDialog({ title, content, setIsConfirm, setIsShowDialog }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
            setIsConfirm(false);
        };
    }, []);
    const handleClickCancel = () => {
        setIsShowDialog(false);
    };
    const handleClickOk = () => {
        setIsConfirm(true);
        setIsShowDialog(false);
    };
    return (
        <div className={clsx(styles.overlay)}>
            <div className={clsx(styles.body)}>
                <div className={clsx(styles.title)}>
                    <span>{title ? title : 'Xác nhận hành động'}</span>
                </div>
                <div className={clsx(styles.content)}>
                    <span>
                        {content ? content : 'Bạn có chắc chắn muốn thực hiện hành động này ?'}
                    </span>
                </div>
                <div className={clsx(styles.bottom)}>
                    <button type="button" onClick={handleClickCancel}>
                        Hủy
                    </button>
                    <button type="button" onClick={handleClickOk}>
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationDialog;
