import clsx from 'clsx';
import NoData from '../components/NoData';
import TitlePage from '../components/TitlePage';
import imgv2 from '../../../assets/img/no_content_v2.png';
import styles from './Monetization.module.css';
function Monetization() {
    return (
        <div className={clsx(styles.wrapper)}>
            <TitlePage text={'Kiêm tiền trên Youtube'} />
            <NoData img={imgv2} bodyText="Nội dung sẽ sớm được cập nhật. Vui lòng quay lại sau" />
        </div>
    );
}

export default Monetization;
