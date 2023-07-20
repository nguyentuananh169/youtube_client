import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Community from '../Community';
import Diary from '../Diary';
import queryString from 'query-string';
import styles from './Left.module.css';
function Left() {
    const { search } = useLocation();
    const { page } = queryString.parse(search);
    let component;
    switch (page) {
        case 'community':
            component = <Community />;
            break;

        default:
            component = <Diary />;
            break;
    }
    return <div className={clsx(styles.wrapper)}>{component}</div>;
}

export default Left;
