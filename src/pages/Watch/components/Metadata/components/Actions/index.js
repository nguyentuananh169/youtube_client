import { BiLike, BiDislike, BiCut } from 'react-icons/bi';
import { RiShareForwardLine } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';
import clsx from 'clsx';
import useClickOutSide from '../../../../../../hook/useClickOutSide';
import Button from '../../../../../../components/Button';
import Tooltip from '../../../../../../components/Tooltip';
import MenuActions from './MenuActions';
import styles from './Actions.module.css';
function Actions() {
    const [elementRef, isShow, setShow] = useClickOutSide(false);
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
                        content="Tạo đoạn video"
                        customStyle={{
                            top: 'calc(100% + 20px)',
                            whiteSpace: 'nowrap',
                        }}
                    />
                    <BiCut />
                    <span>Tạo đoạn video</span>
                </Button>
            </div>
            <div ref={elementRef} className={clsx(styles.btn, styles.btnActions)}>
                {isShow && <MenuActions />}
                <Button onClick={() => setShow(!isShow)}>
                    <BsThreeDots />
                </Button>
            </div>
        </div>
    );
}

export default Actions;
