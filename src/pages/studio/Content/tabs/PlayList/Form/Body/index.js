import clsx from 'clsx';
import styles from './Body.module.css';
function Body({ dataForm, setDatForm, objValidateForm }) {
    const { errors, invalid, removeError } = objValidateForm;
    const handleChange = (name, value) => {
        setDatForm({ ...dataForm, [name]: value });
        removeError(name);
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.inputContainer)}>
                <div className={clsx(styles.group, { [styles.error]: errors.title })}>
                    <label htmlFor="title-input">Tiêu đề (bắt buộc)</label>
                    <input
                        id="title-input"
                        className={clsx(styles.input)}
                        name="title"
                        placeholder="Thêm tiêu đề"
                        value={dataForm.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        onBlur={(e) => invalid('title', e.target.value)}
                    />
                    <div className={clsx(styles.charCounter)}>
                        <span>{dataForm.title.length}/100</span>
                    </div>
                </div>
                {errors.title && <p className={clsx(styles.errorMessage)}>{errors.title}</p>}
            </div>
            <div className={clsx(styles.inputContainer)}>
                <div className={clsx(styles.group, { [styles.error]: errors.des })}>
                    <label htmlFor="des-input">Mô tả</label>
                    <textarea
                        id="des-input"
                        className={clsx(styles.input)}
                        name="title"
                        placeholder="Thêm nội dung mô tả"
                        value={dataForm.des}
                        onChange={(e) => handleChange('des', e.target.value)}
                        onBlur={(e) => invalid('des', e.target.value)}
                    ></textarea>
                    <div className={clsx(styles.charCounter)}>
                        <span>{dataForm.des.length}/500</span>
                    </div>
                </div>
                {errors.des && <p className={clsx(styles.errorMessage)}>{errors.des}</p>}
            </div>
        </div>
    );
}

export default Body;
