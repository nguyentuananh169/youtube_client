import { TfiClose } from 'react-icons/tfi';
import clsx from 'clsx';
import DotMenu from '../../../../components/DotMenu';
import Tooltip from '../../../../components/Tooltip';
import styles from './Modal.module.css';
function Modal({ title = '', handleCloseModal, children, customStyle = {} }) {
    return (
        <div className={clsx(styles.overlay)}>
            <div className={clsx(styles.wrapper)} style={{ ...customStyle }}>
                <div className={clsx(styles.heading)}>
                    <div className={clsx(styles.text)}>
                        <h3>{title}</h3>
                    </div>
                    <div className={clsx(styles.close)} onClick={handleCloseModal}>
                        <Tooltip
                            content={'Đóng'}
                            customStyle={{
                                top: 'calc(100% + 35px)',
                                left: '50%',
                                transform: 'translate(-50%,-50%)',
                            }}
                        />
                        <DotMenu icon={<TfiClose size={20} color="#606060" />} />
                    </div>
                </div>
                <div className={clsx(styles.body)}>{children}</div>
            </div>
        </div>
    );
}

export default Modal;
