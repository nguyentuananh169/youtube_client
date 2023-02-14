import { BsCheckCircleFill } from 'react-icons/bs';
import clsx from 'clsx';
import Button from '../../../../../../components/Button';
import Tooltip from '../../../../../../components/Tooltip';
import styles from './Owner.module.css';
import { Link } from 'react-router-dom';
function Owner({ avatar, name, subscriber, isOfficial = false }) {
    return (
        <div className={clsx(styles.owner)}>
            <div className={clsx(styles.ownerInfo)}>
                <div className={clsx(styles.avatar)}>
                    <img src={avatar} />
                </div>
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.name)}>
                        <div className={clsx(styles.text)}>
                            <Tooltip
                                content={name}
                                customStyle={{ bottom: 'calc(100% + 20px )' }}
                            />
                            <Link to={'/channel/@nta'}>{name}</Link>
                        </div>

                        {isOfficial && (
                            <div className={clsx(styles.icon)}>
                                <Tooltip
                                    content="Đã xác minh"
                                    customStyle={{
                                        bottom: 'calc(100% + 20px )',
                                        left: '-37px',
                                        whiteSpace: 'nowrap',
                                    }}
                                />
                                <BsCheckCircleFill />
                            </div>
                        )}
                    </div>
                    <div className={clsx(styles.subscriber)}>{subscriber}</div>
                </div>
            </div>
            <div className={clsx(styles.subscribeButton)}>
                <Button>Đăng ký</Button>
            </div>
        </div>
    );
}

export default Owner;
