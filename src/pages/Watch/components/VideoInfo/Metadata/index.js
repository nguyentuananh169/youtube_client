import clsx from 'clsx';
import Actions from './Actions';
import Description from './Description';
import Owner from './Owner';
import Title from './Title';
import styles from './Metadata.module.css';
function Metadata({ videoData }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <Title content={videoData.video_title} />
            <div className={clsx(styles.location)}>
                <div className={clsx(styles.topRow)}>
                    <Owner
                        avatar={videoData.user_avatar}
                        name={videoData.user_name}
                        id={videoData.user_id}
                        subscriber={videoData.user_total_subscribe}
                        isOfficial
                    />
                    <Actions
                        videoId={videoData.video_id}
                        like={videoData.video_like}
                        dislike={videoData.video_dislike}
                    />
                </div>
                <div className={clsx(styles.bottomRow)}>
                    <Description videoData={videoData} />
                </div>
            </div>
        </div>
    );
}

export default Metadata;
