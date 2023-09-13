import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import useStore from '../../../../../../hook/useStore';
import NoAvatar from '../../../../../../components/NoAvatar';
import queryString from 'query-string';
import commentApi from '../../../../../../api/commentApi';
import { addToastMessage } from '../../../../../../store/actions';
import LoadingHasMore from '../../../../../../components/LoadingHasMore';
import styles from './Form.module.css';
function Form({
    isHiddenAvatar = false,
    isFocusTextare = false,
    lv2 = false,
    initValueForm = '',
    parentId = 0,
    handleAddCommentSuccess,
    handleEdit,
    handleCloseForm,
    customStyles = {},
}) {
    const [state, dispatch] = useStore();
    const [isFocus, setFocus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowBottom, setShowBottom] = useState(false);
    const [valueForm, setValueForm] = useState(initValueForm);
    const textareaRef = useRef(null);
    const { search } = useLocation();
    const urlParams = queryString.parse(search);
    useEffect(() => {
        if (isFocusTextare) {
            const textareaEl = textareaRef.current;
            textareaEl.focus();
            textareaEl.setSelectionRange(textareaEl.value.length, textareaEl.value.length);
        }
    }, [isFocusTextare]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading || !valueForm.trim()) {
            return;
        }
        if (handleEdit) {
            return handleEdit(valueForm);
        }
        setIsLoading(true);
        const content = valueForm.trim();
        const params = new FormData();
        params.append('_video_id', urlParams.id);
        params.append('_parent_id', parentId);
        params.append('_content', content);
        const response = await commentApi.add(params);
        setIsLoading(false);
        if (response[0].error) {
            return dispatch(addToastMessage('error', 'Thất bại', response[0].message));
        }
        setValueForm('');
        const data = response[0].data;
        data.user_id = state.user?.user_id;
        data.user_name = state.user?.user_name;
        data.user_avatar = state.user?.user_avatar;
        data.user_tag = state.user?.user_tag;
        data.reply = [];
        data.type = 'add';
        handleAddCommentSuccess(data);
    };
    const handleRemove = () => {
        if (handleCloseForm) {
            return handleCloseForm();
        }
        setValueForm('');
        setShowBottom(false);
        const textareaElement = textareaRef.current;
        textareaElement.style.height = '31px';
    };
    const handleResizeTextarea = () => {
        const textareaElement = textareaRef.current;
        textareaElement.style.height = '1px';
        textareaElement.style.height = 16 + textareaElement.scrollHeight + 'px';
    };
    return (
        <>
            {state.isLogin && state.user?.user_id && (
                <div
                    className={clsx(styles.formContainer, { [styles.lv2]: lv2 })}
                    style={customStyles}
                >
                    <div className={clsx(styles.form)}>
                        {!isHiddenAvatar && (
                            <div className={clsx(styles.avatar)}>
                                {state.user?.user_avatar ? (
                                    <img src={state.user.user_avatar} />
                                ) : (
                                    <div className={clsx(styles.noAvatar)}>
                                        <NoAvatar userName={state.user?.user_name} />
                                    </div>
                                )}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className={clsx(styles.textarea, { [styles.focus]: isFocus })}>
                                <textarea
                                    ref={textareaRef}
                                    value={valueForm}
                                    placeholder="Viết bình luận..."
                                    onKeyUp={handleResizeTextarea}
                                    onFocus={() => {
                                        setFocus(true);
                                        setShowBottom(true);
                                    }}
                                    onBlur={() => setFocus(false)}
                                    onChange={(e) => setValueForm(e.target.value)}
                                ></textarea>
                            </div>
                            <div
                                className={clsx(styles.bottomRow, { [styles.show]: isShowBottom })}
                            >
                                <div
                                    className={clsx(styles.actions, {
                                        [styles.active]: valueForm.trim() && !isLoading,
                                    })}
                                >
                                    <div className={clsx(styles.btn)} onClick={handleRemove}>
                                        Hủy
                                    </div>
                                    <button
                                        className={clsx(styles.btn, {
                                            [styles.disable]: isLoading || !valueForm.trim(),
                                        })}
                                    >
                                        {isLoading ? 'Đang gửi...' : 'Bình luận'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {!state.isLogin && !state.user?.user_id && lv2 && (
                <Link className={clsx(styles.textLogin)} to={'/login'}>
                    Vui lòng đăng nhập để tiếp tục
                </Link>
            )}

            {isLoading && <LoadingHasMore />}
        </>
    );
}

export default Form;
