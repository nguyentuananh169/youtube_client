import useStore from '../../hook/useStore';
import Channels from './Channels';
import Unavailable from '../../components/Unavailable';
import img from '../../assets/img/subscriptions.png';

function Subscriptions() {
    const [state] = useStore();
    return (
        <>
            {!state.isLogin && !state.user?.user_id ? (
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
