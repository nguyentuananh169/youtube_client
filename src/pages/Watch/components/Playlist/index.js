import { useState } from 'react';
import clsx from 'clsx';
import styles from './Playlist.module.css';
import Heading from './Heading';
import Body from './Body';
function Playlist({ urlParams, userName, userTag, loadingPage }) {
    const [isCollapse, setIsCollapse] = useState(false);
    return (
        <div className={clsx(styles.wrapper)}>
            <Heading
                loadingPage={loadingPage}
                urlParams={urlParams}
                userName={userName}
                userTag={userTag}
                setIsCollapse={setIsCollapse}
                isCollapse={isCollapse}
            />
            <Body urlParams={urlParams} isCollapse={isCollapse} loadingPage={loadingPage} />
        </div>
    );
}

export default Playlist;
