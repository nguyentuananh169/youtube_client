import { CiEdit, CiYoutube } from 'react-icons/ci';
import { RxLink2 } from 'react-icons/rx';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlinePodcasts } from 'react-icons/md';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import useClickOutSide from '../../../../../hook/useClickOutSide';
import MenuFixed from '../../../../../components/MenuFixed';
import Tooltip from '../../../../../components/Tooltip';
import DotMenu from '../../../../../components/DotMenu';
import styles from './PlayList.module.css';
function Actions({ item, handleClickBtnUpdate, handleClickBtnDelete, handleClickBtnShow }) {
    const [elementRef, isShow, setShow] = useClickOutSide();
    const menu = [
        {
            icon: <RxLink2 size={17} />,
            text: 'Lấy đường liên kết có thể chia sẻ',
        },
        {
            icon: <CiYoutube size={17} />,
            text: 'Chỉnh sửa trên Youtube',
        },
        {
            icon: <MdOutlinePodcasts size={17} />,
            text: 'Đặt làm podcast',
        },
        {
            icon: <RiDeleteBin6Line size={17} />,
            text: 'Xóa vĩnh viễn',
            onClick: () => handleClickBtnDelete(item),
        },
    ];
    return (
        <>
            <div className={clsx(styles.overlay, { [styles.show]: isShow })}></div>
            <div className={clsx(styles.actions, { [styles.showMenu]: isShow })}>
                <button className={clsx(styles.icon)} onClick={() => handleClickBtnUpdate(item)}>
                    <Tooltip
                        data-class="tooltip"
                        content={'Chi tiết'}
                        customStyle={{
                            top: 'calc(100% + 24px)',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            whiteSpace: 'nowrap',
                            fontSize: '1rem',
                            padding: '5px 7px',
                        }}
                    />
                    <CiEdit size={20} />
                </button>
                <label
                    className={clsx(styles.icon)}
                    onClick={() => {
                        handleClickBtnShow(item.playlist_id);
                    }}
                >
                    <Tooltip
                        data-class="tooltip"
                        content={'Video'}
                        customStyle={{
                            top: 'calc(100% + 24px)',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            whiteSpace: 'nowrap',
                            fontSize: '1rem',
                            padding: '5px 7px',
                        }}
                    />
                    <CiYoutube size={20} />
                </label>
                <div
                    ref={elementRef}
                    className={clsx(styles.icon)}
                    onClick={() => setShow(!isShow)}
                >
                    <Tooltip
                        data-class="tooltip"
                        content={'Tùy chọn'}
                        customStyle={{
                            top: 'calc(100% + 24px)',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            whiteSpace: 'nowrap',
                            fontSize: '1rem',
                            padding: '5px 7px',
                        }}
                    />
                    <DotMenu />
                    {isShow && <MenuFixed isDisableScroll menulist={menu} />}
                </div>
            </div>
        </>
    );
}

export default Actions;
