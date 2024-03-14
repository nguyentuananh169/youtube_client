import { CiEdit, CiYoutube } from 'react-icons/ci';
import { SiSimpleanalytics } from 'react-icons/si';
import { TfiCommentAlt } from 'react-icons/tfi';
import { MdOutlineEdit } from 'react-icons/md';
import { RxLink2, RxSpeakerLoud } from 'react-icons/rx';
import { BsCloudArrowDown } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import useClickOutSide from '../../../../../hook/useClickOutSide';
import MenuFixed from '../../../../../components/MenuFixed';
import Tooltip from '../../../../../components/Tooltip';
import DotMenu from '../../../../../components/DotMenu';
import styles from './Shorts.module.css';
function Actions({ item, handleClickBtnUpdate, handleClickBtnDelete }) {
    const [elementRef, isShow, setShow] = useClickOutSide();
    const menu = [
        {
            icon: <MdOutlineEdit size={17} />,
            text: 'Chỉnh sửa tiêu đề và thông tin mô tả',
            onClick: () => handleClickBtnUpdate(item),
        },
        {
            icon: <RxLink2 size={17} />,
            text: 'Lấy đường liên kết có thể chia sẻ',
        },
        {
            icon: <RxSpeakerLoud size={17} />,
            text: 'Quảng cáo',
        },
        {
            icon: <BsCloudArrowDown size={17} />,
            text: 'Tải xuống',
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
                <Link to={'#'} className={clsx(styles.icon)}>
                    <Tooltip
                        data-class="tooltip"
                        content={'Số liệu phân tích'}
                        customStyle={{
                            top: 'calc(100% + 24px)',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            whiteSpace: 'nowrap',
                            fontSize: '1rem',
                            padding: '5px 7px',
                        }}
                    />
                    <SiSimpleanalytics size={20} />
                </Link>
                <Link to={`/studio/comments/${item.video_id}`} className={clsx(styles.icon)}>
                    <Tooltip
                        data-class="tooltip"
                        content={'Bình luận'}
                        customStyle={{
                            top: 'calc(100% + 24px)',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            whiteSpace: 'nowrap',
                            fontSize: '1rem',
                            padding: '5px 7px',
                        }}
                    />
                    <TfiCommentAlt size={20} />
                </Link>
                <Link
                    to={`/watch?category=${item.category_id}&id=${item.video_id}`}
                    className={clsx(styles.icon)}
                >
                    <Tooltip
                        data-class="tooltip"
                        content={'Xem trên Youtube'}
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
                </Link>
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
