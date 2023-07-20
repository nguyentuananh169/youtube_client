import { RiVideoAddLine, RiPlayListAddLine } from 'react-icons/ri';
import { TfiUpload } from 'react-icons/tfi';
import { MdOutlinePodcasts, MdOutlineStream } from 'react-icons/md';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import useClickOutSide from '../../../../../hook/useClickOutSide';
import styles from './CreateContent.module.css';
function CreateContent() {
    const [elementRef, isShow, setShow] = useClickOutSide(false);
    return (
        <div ref={elementRef} className={clsx(styles.wrapper)}>
            <button onClick={() => setShow(!isShow)}>
                <RiVideoAddLine size={19} color="#c00" />
                <span>Tạo</span>
            </button>
            {isShow && (
                <ul className={clsx(styles.dropdownMenu)}>
                    <li>
                        <Link to={'/studio/videos/upload?type=upload'}>
                            <TfiUpload size={19} color="#606060" />
                            <span>Tải video lên</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'#'}>
                            <MdOutlineStream size={19} color="#606060" />
                            <span>Phát trực tiếp</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'#'}>
                            <RiPlayListAddLine size={19} color="#606060" />
                            <span>Danh sách phát mới</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'#'}>
                            <MdOutlinePodcasts size={19} color="#606060" />
                            <span>Podcast mới</span>
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default CreateContent;
