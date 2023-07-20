import { useParams } from 'react-router-dom';
import Videos from './Videos';
import Channels from './Channels';

function Subscriptions() {
    const { page } = useParams();
    let component;
    switch (page) {
        case 'videos':
            component = <Videos />;
            break;
        case 'channels':
            component = <Channels />;
            break;
        default:
            component = <Channels />;
            break;
    }
    return <>{component}</>;
}

export default Subscriptions;
