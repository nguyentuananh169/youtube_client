import { BiLike, BiDislike } from 'react-icons/bi';
import { RiShareForwardLine } from 'react-icons/ri';
import { TfiDownload } from 'react-icons/tfi';

import clsx from 'clsx';
import Button from '../../../../../../components/Button';
import Tooltip from '../../../../../../components/Tooltip';
import styles from './Actions.module.css';
function Actions() {
    return (
        <div className={clsx(styles.actions)}>
            <div className={clsx(styles.btn, styles.likeDislike)}>
                <Button>
                    <Tooltip
                        content={'Tôi thích video này'}
                        customStyle={{
                            top: 'calc(100% + 20px)',
                            whiteSpace: 'nowrap',
                            left: '-10px',
                        }}
                    />
                    <BiLike />
                    <span>4,8N</span>
                </Button>
                <Button>
                    <Tooltip
                        content={'Tôi không thích video này'}
                        customStyle={{
                            top: 'calc(100% + 20px)',
                            whiteSpace: 'nowrap',
                            left: '-50px',
                        }}
                    />
                    <BiDislike />
                    <span></span>
                </Button>
            </div>
            <div className={clsx(styles.btn, styles.share)}>
                <Button>
                    <Tooltip
                        content={'Chia sẻ'}
                        customStyle={{
                            top: 'calc(100% + 20px)',
                            whiteSpace: 'nowrap',
                        }}
                    />
                    <RiShareForwardLine />
                    <span>Chia sẻ</span>
                </Button>
            </div>
            <div className={clsx(styles.btn, styles.share)}>
                <Button>
                    <Tooltip
                        content={'Chia sẻ'}
                        customStyle={{
                            top: 'calc(100% + 20px)',
                            whiteSpace: 'nowrap',
                        }}
                    />
                    <TfiDownload />
                    <span>Tải xuống</span>
                </Button>
            </div>
        </div>
    );
}

export default Actions;
