import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import NoAvatar from '../../../../../components/NoAvatar';
import commentApi from '../../../../../api/commentApi';
import LoadingHasMore from '../../../../../components/LoadingHasMore';
import { addToastMessage } from '../../../../../store/actions/toastMessage';
import styles from './Form.module.css';
function Form({
    isUpdate = false,
    defaultValue = false,
    item,
    index,
    handleSetShowForm,
    handleReplyCommentSuccess,
    handleUpdateCommentSuccess = () => {},
}) {
    const textareaRef = useRef(null);
    const [isFocus, setFocus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [valueForm, setValueForm] = useState(defaultValue ? item.cmt_content : '');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const userAvatar = user.user_avatar;
    const userName = user.user_name;
    const hostUserId = user.user_id;
    const contentSubmit = isUpdate ? 'Chỉnh sửa' : 'Phản hồi';
    useEffect(() => {
        const textareaEl = textareaRef.current;
        textareaEl.focus();
        textareaEl.setSelectionRange(textareaEl.value.length, textareaEl.value.length);
    }, []);
    const handleResizeTextarea = () => {
        const textareaElement = textareaRef.current;
        textareaElement.style.height = '1px';
        textareaElement.style.height = 16 + textareaElement.scrollHeight + 'px';
    };
    const handleSubmit = async () => {
        if (isLoading || !valueForm.trim()) {
            return;
        }
        setIsLoading(true);
        const content = valueForm.trim();
        const params = new FormData();
        params.append('_video_id', item.video_id);
        params.append('_cmt_id', item.cmt_id);
        params.append('_host_user_id', hostUserId);
        params.append('_parent_id', item.cmt_parent_id > 0 ? item.cmt_parent_id : item.cmt_id);
        params.append('_content', content);
        const response = isUpdate ? await commentApi.update(params) : await commentApi.add(params);
        setIsLoading(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        setValueForm('');
        isUpdate
            ? handleUpdateCommentSuccess(index, response[0].content, response[0].timestamp)
            : handleReplyCommentSuccess(response[0].data);
        handleSetShowForm();
        dispatch(addToastMessage('success', 'Thành công', response[0].message));
    };
    return (
        <div className={clsx(styles.wrapper, { [styles.formUpdate]: isUpdate })}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.avatar)}>
                    {userAvatar ? (
                        <img src={userAvatar} />
                    ) : (
                        <NoAvatar userName={userName} customStyles={{ fontSize: '1.6rem' }} />
                    )}
                </div>
                <div className={clsx(styles.body, { [styles.focus]: isFocus })}>
                    <label htmlFor="reply-input">Phản hồi</label>
                    <textarea
                        ref={textareaRef}
                        value={valueForm}
                        placeholder={isUpdate ? 'Nội dung ...' : 'Phản hồi ...'}
                        onKeyUp={handleResizeTextarea}
                        onFocus={() => {
                            setFocus(true);
                        }}
                        onBlur={() => setFocus(false)}
                        onChange={(e) => setValueForm(e.target.value)}
                    ></textarea>
                </div>
            </div>
            <div className={clsx(styles.btns)}>
                <div className={clsx(styles.btn, styles.cancel)} onClick={handleSetShowForm}>
                    Hủy
                </div>
                <div
                    className={clsx(styles.btn, styles.submit, {
                        [styles.active]: !isLoading && valueForm.trim(),
                    })}
                    onClick={handleSubmit}
                >
                    {isLoading ? <LoadingHasMore /> : contentSubmit}
                </div>
            </div>
        </div>
    );
}

export default Form;
