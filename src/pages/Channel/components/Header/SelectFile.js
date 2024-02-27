import { AiFillCamera } from 'react-icons/ai';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Tooltip from '../../../../components/Tooltip';
import styles from './Header.module.css';
import { addToastMessage } from '../../../../store/actions/toastMessage';
import { changeUserInfo } from '../../../../store/actions/auth';
import userApi from '../../../../api/userApi';
function SelectFile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [isLoading, setIsLoading] = useState(false);
    const handleChangeFile = async (e) => {
        const file = e.target.files[0];
        if (!file || isLoading) {
            return;
        }
        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            return dispatch(
                addToastMessage(
                    'error',
                    'Thất bại',
                    'Hình ảnh bạn nhập không đúng định dạng (PNG, JPG)',
                ),
            );
        }
        setIsLoading(true);
        const params = new FormData();
        params.append('_type', 'avatar');
        params.append('_avatar', file);
        const response = await userApi.update_image(params);
        setIsLoading(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        const obj = { ...user };
        obj.user_avatar = response[0].image;
        dispatch(changeUserInfo(obj));
    };
    return (
        <label
            htmlFor="file-avatar"
            className={clsx(styles.selectFile, { [styles.loading]: isLoading })}
        >
            <Tooltip
                content={user.user_avatar ? 'Chỉnh sửa ảnh hồ sơ' : 'Thêm ảnh hồ sơ'}
                customStyle={{
                    top: 'calc(100% + 10px)',
                    whiteSpace: 'nowrap',
                    fontSize: '1.2rem',
                    zIndex: 1,
                }}
            />
            <div className={clsx(styles.icon)}>
                <AiFillCamera />
            </div>
            <input id="file-avatar" type="file" onChange={handleChangeFile} />
        </label>
    );
}

export default SelectFile;
