import clsx from 'clsx';
import img from '../../../../../../../assets/img/error_illustration_v2.jpg';
import styles from './Error.module.css';
function Error() {
    return (
        <div className={clsx(styles.wrapper)}>
            <img src={img} />
            <p>Rất tiếc, đã xảy ra lỗi</p>
            <p>Vui lòng thử lại</p>
        </div>
    );
}

export default Error;
