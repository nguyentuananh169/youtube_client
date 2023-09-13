import clsx from 'clsx';
import Card from './Card';
import NoData from '../components/NoData';
import Form from './Form';
import useStore from '../../../../../hook/useStore';
import styles from './Community.module.css';
function Community({ user }) {
    const [state] = useStore();
    return (
        <div className={clsx(styles.wrapper, styles.noData)}>
            {state.isLogin && user.user_id === state.user?.user_id && <Form user={user} />}
            <NoData isBtn={false} textSpan="Kênh này chưa đăng bài." />
            <Card />
            <Card />
            <Card />
        </div>
    );
}

export default Community;
