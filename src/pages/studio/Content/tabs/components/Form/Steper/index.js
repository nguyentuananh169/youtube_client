import clsx from 'clsx';
import styles from './Steper.module.css';
function Steper({ steper, setSteper }) {
    const steps = ['Chi tiết', 'Các thành phần của video', 'Kiểm tra', 'Chế độ hiển thị'];
    return (
        <div className={clsx(styles.wrapper)}>
            {steps.map((item, index) => (
                <div
                    key={index}
                    className={clsx(styles.step, {
                        [styles.active]: steper === index + 1 || steper > index + 1,
                        [styles.bg1]: steper > index + 1,
                        [styles.bg2]: steper >= index + 1,
                    })}
                >
                    <div className={clsx(styles.btn)} onClick={() => setSteper(index + 1)}>
                        <div className={clsx(styles.text)}>{item}</div>
                        <div className={clsx(styles.dot)}>
                            <div className={clsx(styles.round)}></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Steper;
