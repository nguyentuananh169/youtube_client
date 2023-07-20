import clsx from 'clsx';
import styles from './PlayList.module.css';
import Card from './Card';
function PlayList() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.header)}>
                <span>Danh sách phát đã tạo</span>
            </div>
            <div className={clsx(styles.list)}>
                {Array(10)
                    .fill(0)
                    .map((item, index) => (
                        <Card
                            key={index}
                            img={'https://hinhgoc.net/upload/img/imagestock-0393.jpg'}
                            total={10}
                            title={'Nhạc chill tiktok 13'}
                            time={'Cập nhật hôm nay'}
                            link={'#'}
                        />
                    ))}
            </div>
        </div>
    );
}

export default PlayList;
