import { BsCheckCircleFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import clsx from 'clsx';
import Tooltip from '../../../../components/Tooltip';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
function Header({ params }) {
    const { id } = useParams();
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.img)}>
                    <img src="https://yt3.googleusercontent.com/gqG_aR9B8SlJw4cW9PVq0N7toikRLfV4rBYwKShDqZ49sScY9R4FZK6_2mfsO_uBsJ4ayNN5Aw=s176-c-k-c0x00ffffff-no-rj" />
                </div>
                <div className={clsx(styles.owner)}>
                    <div className={clsx(styles.name)}>
                        <strong>
                            Bụi Chill
                            <Tooltip
                                content="Bụi Chill"
                                customStyle={{
                                    left: '50%',
                                    bottom: '100%',
                                    transform: 'translate(-50%, -50%)',
                                    whiteSpace: 'nowrap',
                                }}
                            />
                        </strong>
                        <strong>
                            <BsCheckCircleFill size={12} />
                            <Tooltip
                                content="Đã xác minh"
                                customStyle={{
                                    left: '50%',
                                    bottom: '100%',
                                    transform: 'translate(-50%, -50%)',
                                    whiteSpace: 'nowrap',
                                }}
                            />
                        </strong>
                        <div className={clsx(styles.btn1)}>
                            <button>Đăng ký</button>
                        </div>
                    </div>
                    <p className={clsx(styles.meta)}>
                        <strong>@BuiChill</strong>
                        <span>225 N người đăng ký</span>
                        <span>344 video</span>
                    </p>
                    <p className={clsx(styles.about)}>
                        <Link to={`/channel/${id}/about`}>
                            Bụi Chill là kênh nhạc tổng hợp những bản nhạc hot nhất hiện nay. Cùng
                            nghe và thư giãn nhé cả nhà 🥰
                        </Link>
                        <MdArrowForwardIos size={18} />
                    </p>
                </div>
                <div className={clsx(styles.btn2)}>
                    <button>Đăng ký</button>
                </div>
            </div>
        </div>
    );
}

export default Header;
