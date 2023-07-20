import { BsDot, BsCheckCircleFill } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import clsx from 'clsx';

import Tooltip from '../../../components/Tooltip';

import styles from './Channels.module.css';
import Actions from './Actions';
function Channels() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.heading)}>
                <h3>Tất cả kênh đã đăng ký</h3>
            </div>
            {Array(10)
                .fill(0)
                .map((item, index) => (
                    <div key={index} className={clsx(styles.body)}>
                        <Link to={'#'} className={clsx(styles.channel)}>
                            <div className={clsx(styles.img)}>
                                <img src="https://yt3.googleusercontent.com/sRhKv0BM8jaNEWohgVcxv4bengflseeCPUtzINiGe_grG2CPZXIriR5ytxvZlxOVv8LEgV9-J_M=s176-c-k-c0x00ffffff-no-rj-mo" />
                            </div>
                            <div className={clsx(styles.info)}>
                                <div className={clsx(styles.owner)}>
                                    <div className={clsx(styles.name)}>
                                        <Tooltip
                                            content={'Ni Tac - 冯提莫 Feng Timo'}
                                            customStyle={{
                                                bottom: '100% ',
                                                left: '50%',
                                                transform: 'translate(-50%,-50%)',
                                                fontSize: '1.2rem',
                                                whiteSpace: 'nowrap',
                                            }}
                                        />
                                        <span className={clsx(styles.text)}>
                                            Ni Tac - 冯提莫 Feng Timo
                                        </span>
                                    </div>
                                    <div className={clsx(styles.official)}>
                                        <Tooltip
                                            content={'Đã xác minh'}
                                            customStyle={{
                                                bottom: '100% ',
                                                left: '50%',
                                                transform: 'translate(-50%,-50%)',
                                                fontSize: '1.2rem',
                                                whiteSpace: 'nowrap',
                                            }}
                                        />
                                        <BsCheckCircleFill size={13} color="#606060" />
                                    </div>
                                </div>
                                <div className={clsx(styles.subscriber)}>
                                    <div className={clsx(styles.count1)}>785 N người đăng ký</div>
                                    <div className={clsx(styles.icon)}>
                                        <BsDot fontSize={14} color="#606060" />
                                    </div>
                                    <div className={clsx(styles.count2)}>1.788 video</div>
                                </div>
                                <div className={clsx(styles.des)}>
                                    Xin chào mọi người, mình là Ni Tac - một fan "cứng" của Feng
                                    Timo, mình đăng tải clip với mong muốn nhiều người biết đến Feng
                                    Timo hơn! 我是冯
                                </div>
                            </div>
                        </Link>
                        <Actions />
                    </div>
                ))}
        </div>
    );
}

export default Channels;
