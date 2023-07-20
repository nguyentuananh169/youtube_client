import clsx from 'clsx';
import NoData from '../components/NoData';
import TitlePage from '../components/TitlePage';
import imgv2 from '../../../assets/img/no_content_v2.png';
import styles from './Comments.module.css';
function Comments() {
    return (
        <div className={clsx(styles.wrapper)}>
            <TitlePage text={'Bình luận trên kênh và lượt đề cập'} />
            <NoData img={imgv2} bodyText="Nội dung sẽ sớm được cập nhật. Vui lòng quay lại sau" />
        </div>
    );
}

export default Comments;
