import { useSelector } from 'react-redux';
import clsx from 'clsx';
import styles from './Library.module.css';
import Contents from './Contents';
import Unavailable from '../../components/Unavailable';
import img from '../../assets/img/library.png';
function Library() {
    const auth = useSelector((state) => state.auth);
    return (
        <div className={clsx(styles.wrapper)}>
            {!auth.isLogin && !auth.user?.user_id ? (
                <Unavailable
                    img={img}
                    title={'Thưởng thức các video yêu thích của bạn'}
                    text={'Đăng nhập để truy cập video bạn đã thích hoặc đã lưu'}
                    linkUrl={'/login'}
                    linkText={'Đăng nhập'}
                />
            ) : (
                <Contents />
            )}
        </div>
    );
}

export default Library;
