import { BsFillCheckCircleFill, BsExclamationCircle } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import TitlePage from '../components/TitlePage';
import { useValidateForm } from '../../../hook/useValidateForm';
import EditorComp from './EditComp';
import userApi from '../../../api/userApi';
import { addToastMessage } from '../../../store/actions/toastMessage';
import { changeUserInfo } from '../../../store/actions/auth';
import styles from './Editing.module.css';
function Editing() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [isLoadingCheck, setLoadingCheck] = useState(false);
    const [isTagExists, setIsTagExists] = useState(false);
    const [isLoadingSubmit, setLoadingSubmit] = useState(false);
    const [valueForm, setValueForm] = useState({
        name: user.user_name,
        tag: user.user_tag.substring(1),
        des: user.user_des || '',
        desText: '',
    });
    const timeoutRef = useRef(null);
    const validates = [
        {
            name: 'name',
            rules: { isRequired: true, minLength: 6, maxLength: 25 },
        },
        {
            name: 'tag',
            rules: { isRequired: true, minLength: 6, maxLength: 25 },
        },
        {
            name: 'desText',
            rules: { maxLength: 500 },
        },
    ];
    const handleCheckUserTag = async (value) => {
        if (isLoadingCheck || isLoadingSubmit || value.length < 6 || value.length > 25) {
            return;
        }
        setLoadingCheck(true);
        const formData = {
            _keyword: `@${value}`,
        };
        const response = await userApi.checkTagExists(formData);
        setIsTagExists(response[0].error);
        setLoadingCheck(false);
    };
    const handleSubmit = async () => {
        if (isLoadingCheck || isLoadingSubmit || isTagExists) {
            return;
        }
        setLoadingSubmit(true);
        const params = new FormData();
        params.append('_user_name', valueForm.name);
        params.append('_user_tag', `@${valueForm.tag}`);
        params.append('_user_des', valueForm.des);
        const response = await userApi.update(params);
        setLoadingSubmit(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        const obj = { ...user };
        obj.user_name = valueForm.name;
        obj.user_tag = `@${valueForm.tag}`;
        obj.user_des = valueForm.des;
        dispatch(changeUserInfo(obj));
        dispatch(addToastMessage('success', 'Thành công', response[0].message));
    };
    const handleChange = (name, value) => {
        if (isLoadingSubmit) {
            return;
        }
        if (name === 'tag') {
            const clearValue = value.replace(/[^a-zA-Z0-9]/g, '');
            setValueForm({ ...valueForm, [name]: clearValue });
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => handleCheckUserTag(clearValue), 700);
        } else {
            setValueForm({ ...valueForm, [name]: value });
        }
        removeError(name);
    };
    const { errors, invalid, removeError, formSubmit } = useValidateForm(validates, handleSubmit);
    return (
        <div className={clsx(styles.wrapper)}>
            <TitlePage text={'Tùy chỉnh kênh'} />
            <form className={clsx(styles.form)} onSubmit={(e) => formSubmit(e, valueForm)}>
                <div className={clsx(styles.group)}>
                    <label className={clsx(styles.label)}>Tên</label>
                    <p className={clsx(styles.note)}>
                        Chọn tên kênh thể hiện cá tính và nội dung của bạn. Những thay đổi về tên và
                        hình đại diện của bạn chỉ xuất hiện trên YouTube và không xuất hiện trên các
                        dịch vụ khác của Google. Bạn có thể đổi tên hai lần trong 14 ngày.
                    </p>
                    <div className={clsx(styles.input, { [styles.error]: errors.name })}>
                        <input
                            type="text"
                            placeholder="Nhập tên kênh"
                            name="name"
                            value={valueForm.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            onBlur={(e) => invalid('name', e.target.value)}
                        />
                        <div className={clsx(styles.icon)}>
                            {errors.name && <BsExclamationCircle size={17} color="#d01313" />}
                        </div>
                    </div>
                    {errors.name && <p className={clsx(styles.errorText)}>{errors.name}</p>}
                </div>
                <div className={clsx(styles.group)}>
                    <label className={clsx(styles.label)}>Tên người dùng</label>
                    <p className={clsx(styles.note)}>
                        Thêm chữ cái và số để chọn tên người dùng duy nhất. Bạn có thể đổi về tên
                        người dùng cũ trong vòng 14 ngày. Bạn có thể thay đổi tên người dùng 2 lần
                        trong mỗi 14 ngày.
                    </p>
                    <div
                        className={clsx(styles.input, {
                            [styles.error]: errors.tag || isTagExists,
                        })}
                    >
                        {valueForm.tag && <p style={{ fontSize: '1.4rem' }}>@</p>}
                        <input
                            type="text"
                            placeholder="Đặt tên người dùng"
                            name="tag"
                            value={valueForm.tag}
                            onChange={(e) => handleChange('tag', e.target.value)}
                            onBlur={(e) => invalid('tag', e.target.value)}
                        />
                        <div className={clsx(styles.icon)}>
                            {(errors.tag || isTagExists) && !isLoadingCheck && (
                                <BsExclamationCircle size={17} color="#d01313" />
                            )}
                            {!isLoadingCheck && !isTagExists && !errors.tag && (
                                <BsFillCheckCircleFill size="17" color="#007800" />
                            )}
                            {isLoadingCheck && (
                                <AiOutlineLoading3Quarters
                                    className={clsx(styles.loading)}
                                    size={17}
                                    color="#606060"
                                />
                            )}
                        </div>
                    </div>
                    {errors.tag && <p className={clsx(styles.errorText)}>{errors.tag}</p>}
                    {isTagExists && !isLoadingCheck && (
                        <p className={clsx(styles.errorText)}>
                            Đã có người chọn tên người dùng này. Bạn hãy chọn tên khác.
                        </p>
                    )}
                </div>
                <div className={clsx(styles.group)}>
                    <label className={clsx(styles.label)}>Thông tin mô tả</label>
                    <div
                        className={clsx(styles.input, styles.des, {
                            [styles.error]: errors.desText,
                        })}
                    >
                        <EditorComp
                            handleChange={handleChange}
                            invalid={invalid}
                            initValue={valueForm.des}
                        />
                        <div className={clsx(styles.countChar)}>{valueForm.desText.length}/500</div>
                    </div>
                    {errors.desText && <p className={clsx(styles.errorText)}>{errors.desText}</p>}
                </div>
                <div
                    className={clsx(styles.submit, {
                        [styles.disable]:
                            Object.keys(errors).length > 0 ||
                            isLoadingCheck ||
                            isLoadingSubmit ||
                            isTagExists,
                    })}
                >
                    <button>Lưu lại</button>
                </div>
            </form>
        </div>
    );
}

export default Editing;
