import { AiFillCamera, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import userApi from '../../../../api/userApi';
import Tooltip from '../../../../components/Tooltip';
import { addToastMessage } from '../../../../store/actions/toastMessage';
import styles from './Banner.module.css';
function Banner({ user, setUser }) {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
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
        params.append('_type', 'banner');
        params.append('_banner', file);
        const response = await userApi.update_image(params);

        setIsLoading(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        const obj = { ...user };
        obj.user_banner = response[0].image;
        setUser(obj);
    };
    return (
        <div className={clsx(styles.wrapper)}>
            {auth.isLogin && auth.user?.user_id && auth.user?.user_id === user.user_id && (
                <label
                    className={clsx(styles.selectFile, { [styles.loading]: isLoading })}
                    htmlFor="select-file"
                >
                    <Tooltip
                        content={
                            user?.user_banner
                                ? 'Chỉnh sửa ảnh bìa (2048 x 1152)'
                                : 'Thêm ảnh bìa (2048 x 1152)'
                        }
                        customStyle={{
                            right: 0,
                            top: 'calc(100% + 10px)',
                            whiteSpace: 'nowrap',
                            fontSize: '1.2rem',
                            zIndex: 1,
                        }}
                    />
                    <div className={clsx(styles.icon)}>
                        {isLoading ? <AiOutlineLoading3Quarters /> : <AiFillCamera />}
                        <span>{user?.user_banner ? 'Chỉnh sửa ảnh bìa' : 'Thêm ảnh bìa'}</span>
                    </div>
                    <input type="file" id="select-file" onChange={handleChangeFile} />
                </label>
            )}
            {user?.user_banner ? (
                <div
                    className={clsx(styles.banner)}
                    style={{ backgroundImage: `url(${user?.user_banner})` }}
                ></div>
            ) : (
                <div className={clsx(styles.noBanner)}>
                    <span>{user.user_name}</span>
                </div>
            )}
        </div>
    );
}

export default Banner;
