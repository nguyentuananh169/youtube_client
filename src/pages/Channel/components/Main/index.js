import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Main.module.css';
import Home from './Home';
import Videos from './Videos';
import PlayList from './PlayList';
import Community from './Community';
import Channels from './Channels';
import About from './About';

function Main({ user }) {
    const { page } = useParams();
    return (
        <div className={clsx(styles.wrapper)}>
            {user?.user_id && (
                <>
                    <div className={clsx(styles.group, { [styles.show]: page === 'home' })}>
                        <Home />
                    </div>
                    <div className={clsx(styles.group, { [styles.show]: page === 'videos' })}>
                        <Videos />
                    </div>
                    <div className={clsx(styles.group, { [styles.show]: page === 'playlist' })}>
                        <PlayList />
                    </div>
                    <div className={clsx(styles.group, { [styles.show]: page === 'community' })}>
                        <Community user={user} />
                    </div>
                    <div className={clsx(styles.group, { [styles.show]: page === 'channels' })}>
                        <Channels />
                    </div>
                    <div className={clsx(styles.group, { [styles.show]: page === 'about' })}>
                        <About user={user} />
                    </div>
                </>
            )}
        </div>
    );
}

export default Main;
