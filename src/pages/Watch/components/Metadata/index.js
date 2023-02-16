import clsx from 'clsx';
import Actions from './components/Actions';
import Description from './components/Description';
import Owner from './components/Owner';
import Title from './components/Title';
import styles from './Metadata.module.css';
function Metadata() {
    return (
        <div className={clsx(styles.wrapper)}>
            <Title content="Nhạc Thư Giãn Giảm Căng Thẳng Mệt Mỏi Tức Thì, Xua Tan Cảm Xúc Tiêu Cực, Tăng Cường Sự Tập Trung" />
            <div className={clsx(styles.topRow)}>
                <Owner
                    avatar="https://yt3.ggpht.com/ytc/AMLnZu8iE_CcyRx0x12MV1EvEMzJFVeoe6_6oavoSfLa0A=s48-c-k-c0x00ffffff-no-rj"
                    name="Nguyễn Tuấn Anh Offical"
                    subscriber="10 Tr người đăng ký"
                    isOfficial
                />
                <Actions />
            </div>
            <div className={clsx(styles.bottomRow)}>
                <Description />
            </div>
        </div>
    );
}

export default Metadata;
