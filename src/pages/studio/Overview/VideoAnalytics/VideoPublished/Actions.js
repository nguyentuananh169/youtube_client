import { MdOutlineModeEdit, MdOutlineAnalytics, MdOutlineComment } from 'react-icons/md';
import { CiYoutube } from 'react-icons/ci';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Tooltip from '../../../../../components/Tooltip';
import styles from './VideoPublished.module.css';
function Actions({ videoId, categoryId }) {
    return (
        <>
            <div className={clsx(styles.action)}>
                <Link to="/studio/videos/upload">
                    <MdOutlineModeEdit size={20} color="#606060" />
                </Link>
                <Tooltip
                    content="Chi tiết"
                    data-class="tooltip"
                    customStyle={{
                        top: 'calc(100% + 20px)',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap',
                        fontSize: '1rem',
                        padding: '5px 7px',
                    }}
                />
            </div>
            <div className={clsx(styles.action)}>
                <Link to={'/studio/analytics'}>
                    <MdOutlineAnalytics size={20} color="#606060" />
                </Link>
                <Tooltip
                    content="Số liệu phân tích"
                    data-class="tooltip"
                    customStyle={{
                        top: 'calc(100% + 20px)',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap',
                        fontSize: '1rem',
                        padding: '5px 7px',
                    }}
                />
            </div>
            <div className={clsx(styles.action)}>
                <Link to={`/studio/comments/${videoId}`}>
                    <MdOutlineComment size={20} color="#606060" />
                </Link>
                <Tooltip
                    content="Bình luận"
                    data-class="tooltip"
                    customStyle={{
                        top: 'calc(100% + 20px)',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap',
                        fontSize: '1rem',
                        padding: '5px 7px',
                    }}
                />
            </div>
            <div className={clsx(styles.action)}>
                <Link to={`/watch?category=${categoryId}&id=${videoId}`}>
                    <CiYoutube size={20} color="#606060" />
                </Link>
                <Tooltip
                    content="Xem trên Youtube"
                    data-class="tooltip"
                    customStyle={{
                        top: 'calc(100% + 20px)',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap',
                        fontSize: '1rem',
                        padding: '5px 7px',
                    }}
                />
            </div>
        </>
    );
}

export default Actions;
