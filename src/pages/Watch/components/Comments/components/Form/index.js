import { useRef, useState } from 'react';
import { CgSmileMouthOpen } from 'react-icons/cg';
import clsx from 'clsx';
import Button from '../../../../../../components/Button';
import styles from './Form.module.css';
function Form({ lv2 = false }) {
    const [isFocus, setFocus] = useState(false);
    const [isShowBottom, setShowBottom] = useState(false);
    const [valueForm, setValueForm] = useState('');
    const textareaRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const handleRemove = () => {
        setValueForm('');
        setShowBottom(false);
    };
    const handleResizeTextarea = (e) => {
        const textareaElement = e.target;
        textareaElement.style.height = '1px';
        textareaElement.style.height = 16 + textareaElement.scrollHeight + 'px';
    };
    return (
        <div className={clsx(styles.formContainer, { [styles.lv2]: lv2 })}>
            <div className={clsx(styles.avatar)}>
                <img src="https://yt3.ggpht.com/ytc/AMLnZu-ddZ6DjEiKxlFdV8KFvnyYzu2CVqosHFbZmg=s88-c-k-c0x00ffffff-no-rj-mo" />
            </div>
            <div className={clsx(styles.form)}>
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
                    <div className={clsx(styles.bottomRow, { [styles.show]: isShowBottom })}>
                        <div className={clsx(styles.icon)}>
                            <Button>
                                <CgSmileMouthOpen />
                            </Button>
                        </div>
                        <div className={clsx(styles.actions, { [styles.active]: valueForm })}>
                            <Button onClick={handleRemove}>Hủy</Button>
                            <Button disabled={!valueForm}>Bình luận</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;
