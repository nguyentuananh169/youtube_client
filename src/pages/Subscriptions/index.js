import { useSelector } from 'react-redux';
import Channels from './Channels';
import Unavailable from '../../components/Unavailable';
import img from '../../assets/img/subscriptions.png';

function Subscriptions() {
    const auth = useSelector((state) => state.auth);
    return (
        <>
            {!auth.isLogin && !auth.user?.user_id ? (
                <Unavailable
                    img={img}
                    title={'Đừng bỏ lỡ video mới'}
                    text={'Đăng nhập để xem cập nhật từ các kênh YouTube yêu thích của bạn'}
                    linkUrl={'/login'}
                    linkText={'Đăng nhập'}
                />
            ) : (
                <Channels />
            )}
        </>
    );
}

export default Subscriptions;
