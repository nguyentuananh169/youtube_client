import clsx from 'clsx';
import bg from '../../assets/img/error-page.jpg';
import styles from './Error.module.css';
import Error403 from './Error403';
import { Link, useParams } from 'react-router-dom';
function Error() {
    const { code } = useParams();
    let comp;
    switch (code) {
        case '403':
            comp = <Error403 />;
            break;

        default:
            comp = (
                <p>
                    <Link to={'/'}>Quay về trang chủ</Link>
                </p>
            );
            break;
    }
    return (
        <div className={clsx(styles.wrapper)} style={{ backgroundImage: `url(${bg})` }}>
            {comp}
        </div>
    );
}

export default Error;
