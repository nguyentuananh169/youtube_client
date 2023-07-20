import clsx from 'clsx';
import Filter from './components/Filter';
import styles from './Search.module.css';
import VideoCard from '../../components/VideoCard';
function Search() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.filter)}>
                <Filter />
            </div>
            <div className={clsx(styles.itemList)}>
                <div className={clsx(styles.title)}>
                    <h3>Kết quả hàng đầu</h3>
                </div>
                <VideoCard isPreview row showDes />
                <VideoCard isPreview row showDes />
                <VideoCard isPreview row showDes />
            </div>
        </div>
    );
}

export default Search;
