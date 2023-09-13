import { BsCardImage } from 'react-icons/bs';
import { GiFilmStrip } from 'react-icons/gi';

import clsx from 'clsx';
import styles from './Form.module.css';
import NoAvatar from '../../../../../../components/NoAvatar';
import { useState } from 'react';
import TabImage from './TabImage';
import EditorComp from './EditorComp';
import { useValidateForm } from '../../../../../../hook/useValidateForm';
function Form({ user }) {
    const [valueForm, setValueForm] = useState({
        type: '',
        content: '',
        contentText: '',
        imgs: [],
        video_id: '',
    });
    const [isSubmit, setSubmit] = useState(false);
    const validates = [
        {
            name: 'contentText',
            rules: { isRequired: true, maxLength: 500 },
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
    const handleSubmit = () => {
        setSubmit(true);
        if (!valueForm.type) {
            return;
        }
        alert('submit');
    };
    const { errors, invalid, removeError, formSubmit } = useValidateForm(validates, handleSubmit);
    const handleChange = (name, value) => {
        setValueForm({ ...valueForm, [name]: value });
        removeError(name);
    };
    const handleCloseTab = (type) => {
        if (type === 'imgs') {
            setValueForm({ ...valueForm, type: '', imgs: [] });
            removeError(type);
        } else if (type === 'video_id') {
            setValueForm({ ...valueForm, type: '', video_id: '' });
            removeError(type);
        }
    };
    console.log(valueForm);
    console.log(errors);
    return (
        <form className={clsx(styles.wrapper)} onSubmit={(e) => formSubmit(e, valueForm)}>
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
                <EditorComp handleChange={handleChange} invalid={invalid} />
                <div className={clsx(styles.charCounter)}>{valueForm.contentText.length}/500</div>
                {errors.contentText && <p className={clsx(styles.error)}>{errors.contentText}</p>}
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
                    {isSubmit && <p className={clsx(styles.error)}>Hãy chọn hình ảnh hoặc video</p>}
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
        </form>
    );
}

export default Form;
