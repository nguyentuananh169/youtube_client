import clsx from 'clsx';
import FilterCategory from './components/FilterCategory';
import ItemList from './components/ItemList';
import styles from './VideoList.module.css';
function VideoList() {
    return (
        <div className={clsx(styles.wrapper)}>
            {/* <FilterCategory /> */}
            <div className={clsx(styles.videoList)}>
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
            </div>
        </div>
    );
}

export default VideoList;
