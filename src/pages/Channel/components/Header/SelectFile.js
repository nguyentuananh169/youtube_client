import { AiFillCamera } from 'react-icons/ai';
import clsx from 'clsx';
import Tooltip from '../../../../components/Tooltip';
import useStore from '../../../../hook/useStore';
import styles from './Header.module.css';
import { addToastMessage, changeUserInfo } from '../../../../store/actions';
import userApi from '../../../../api/userApi';
import { useState } from 'react';
function SelectFile() {
    const [state, dispatch] = useStore();
    const { user } = state;
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
