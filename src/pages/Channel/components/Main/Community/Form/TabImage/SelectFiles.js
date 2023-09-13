import { RiImageAddFill } from 'react-icons/ri';

import clsx from 'clsx';
import styles from './TabImage.module.css';
function SelectFiles({ errors, handleChangeInput, handleClickInput }) {
    return (
        <>
            <div className={clsx(styles.img)}>
                <RiImageAddFill size={40} />
            </div>
            <p>Được chọn tối đa 5 hình ảnh</p>
            <div className={clsx(styles.btn)}>
                <label htmlFor="select-img">Chọn hình ảnh tải lên</label>
                <input
                    type="file"
                    id="select-img"
                    multiple
                    onChange={handleChangeInput}
                    onClick={handleClickInput}
                />
            </div>
            {errors.imgs && <p className={clsx(styles.error)}>{errors.imgs}</p>}
            <p>Vui lòng tải ảnh có tỉ lệ 2:5 hoặc 5:2</p>
            <p>Chỉ chọn hình ảnh hoặc ảnh GIF mà bạn có quyền sử dụng</p>
        </>
    );
}

export default SelectFiles;
