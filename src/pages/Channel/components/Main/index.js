import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Main.module.css';
import Home from './Home';
import Videos from './Videos';
import PlayList from './PlayList';
import Community from './Community';
import Channels from './Channels';
import About from './About';
import Search from './Search';

function Main() {
    const { page } = useParams();
    let component;
    switch (page) {
        case 'home':
            component = <Home />;
            break;
        case 'videos':
            component = <Videos />;
            break;
        case 'playlist':
            component = <PlayList />;
            break;
        case 'community':
            component = <Community />;
            break;
        case 'channels':
            component = <Channels />;
            break;
        case 'about':
            component = <About />;
            break;
        case 'search':
            component = <Search />;
            break;
        default:
            component = <Home />;
            break;
    }
    return <div className={clsx(styles.wrapper)}>{component}</div>;
}

export default Main;
