import { BsCardImage } from 'react-icons/bs';
import { GiFilmStrip } from 'react-icons/gi';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import NoAvatar from '../../../../../../components/NoAvatar';
import TabImage from './TabImage';
import EditorComp from './EditorComp';
import { useValidateForm } from '../../../../../../hook/useValidateForm';
import TabVideo from './TabVideo';
import postsApi from '../../../../../../api/postsApi';
import { addToastMessage } from '../../../../../../store/actions/toastMessage';
import LoadingHasMore from '../../../../../../components/LoadingHasMore';
import styles from './Form.module.css';
function Form({ user, handleFetchPost }) {
    const [valueForm, setValueForm] = useState({
        type: '',
        content: '',
        contentText: '',
        imgs: [],
        video_id: '',
        videoItem: {},
    });
    const [isSubmit, setSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const validates = [
        {
            name: 'contentText',
            rules: { isRequired: true, maxLength: 700 },
        },
        {
            name: 'imgs',
            rules: {},
        },
        {
            name: 'video_id',
            rules: {},
        },
    ];
    if (valueForm.type === 'img') {
        validates[1].rules = { isRequired: true, isFileImg: true, maxFile: 5 };
        validates[2].rules = {};
    } else if (valueForm.type === 'video_id') {
        validates[1].rules = {};
        validates[2].rules = { isRequired: true };
    }
    const handleResetValueForm = () => {
        setValueForm({
            type: '',
            content: '',
            contentText: '',
            imgs: [],
            video_id: '',
            videoItem: {},
        });
    };
    const handleSubmit = async () => {
        setSubmit(true);
        if (!valueForm.type || isLoading) {
            return;
        }
        setIsLoading(true);
        const params = new FormData();
        params.append('_post_type', valueForm.type);
        params.append('_post_content', valueForm.content);
        if (valueForm.type === 'img') {
            for (let i = 0; i < valueForm.imgs.length; i++) {
                params.append('_post_img[]', valueForm.imgs[i]);
            }
        } else {
            params.append('_video_id', valueForm.video_id);
        }
        const response = await postsApi.add(params);
        setIsLoading(false);
        setSubmit(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        handleResetValueForm();
        handleFetchPost(1, true);
        dispatch(addToastMessage('success', 'Thành công', response[0].message));
    };
    const { errors, invalid, removeError, formSubmit } = useValidateForm(validates, handleSubmit);
    const handleChange = (name, value) => {
        setValueForm({ ...valueForm, [name]: value });
        removeError(name);
    };
    const handleCloseTab = (type) => {
        if (type === 'img') {
            setValueForm({ ...valueForm, type: '', imgs: [] });
            removeError(type);
        } else if (type === 'video_id') {
            setValueForm({ ...valueForm, type: '', video_id: '', videoItem: {} });
            removeError(type);
        }
    };
    return (
        <form className={clsx(styles.wrapper)} onSubmit={(e) => formSubmit(e, valueForm)}>
            {isLoading ? (
                <LoadingHasMore />
            ) : (
                <>
                    <div className={clsx(styles.owner)}>
                        <div className={clsx(styles.avatar)}>
                            {user.user_avatar ? (
                                <img src={user.user_avatar} />
                            ) : (
                                <NoAvatar userName={user.user_name} />
                            )}
                        </div>
                        <div className={clsx(styles.name)}>{user.user_name}</div>
                    </div>
                    <div className={clsx(styles.content)}>
                        <EditorComp
                            handleChange={handleChange}
                            invalid={invalid}
                            initValue={valueForm.content}
                        />
                        <div className={clsx(styles.charCounter)}>
                            {valueForm.contentText.length}/700
                        </div>
                        {errors.contentText && (
                            <p className={clsx(styles.error)}>{errors.contentText}</p>
                        )}
                    </div>
                    {valueForm.type === 'img' && (
                        <TabImage
                            errors={errors}
                            valueForm={valueForm}
                            setValueForm={setValueForm}
                            handleChange={handleChange}
                            invalid={invalid}
                            handleCloseTab={handleCloseTab}
                            removeError={removeError}
                        />
                    )}
                    {valueForm.type === 'video_id' && (
                        <TabVideo
                            handleCloseTab={handleCloseTab}
                            valueForm={valueForm}
                            setValueForm={setValueForm}
                        />
                    )}
                    {valueForm.type === '' && (
                        <>
                            <div className={clsx(styles.btns)}>
                                <label
                                    className={clsx(styles.btn)}
                                    onClick={() => setValueForm({ ...valueForm, type: 'img' })}
                                >
                                    <BsCardImage size={15} />
                                    Hình ảnh
                                </label>
                                <label
                                    className={clsx(styles.btn)}
                                    onClick={() => setValueForm({ ...valueForm, type: 'video_id' })}
                                >
                                    <GiFilmStrip size={15} />
                                    Video
                                </label>
                            </div>
                            {isSubmit && (
                                <p className={clsx(styles.error)}>Hãy chọn hình ảnh hoặc video</p>
                            )}
                        </>
                    )}
                    <div className={clsx(styles.btnSubmit)}>
                        <button
                            className={clsx({
                                [styles.disable]: !valueForm.type || Object.keys(errors).length > 0,
                            })}
                            type="submit"
                        >
                            Đăng
                        </button>
                    </div>
                </>
            )}
        </form>
    );
}

export default Form;
