import { useEffect, useRef } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import clsx from 'clsx';
import TitlePage from '../components/TitlePage';
import Upload from './tabs/Upload';
import Live from './tabs/Live';
import PlayList from './tabs/PlayList';
import Podcast from './tabs/Podcast';
import Shorts from './tabs/Shorts';
import styles from './Content.module.css';
function Content() {
    const tabs = [
        {
            text: 'Video',
            path: '/studio/videos/upload',
            tab: 'upload',
        },
        {
            text: 'Video ngắn',
            path: '/studio/videos/shorts',
            tab: 'shorts',
        },
        {
            text: 'Trực tiếp',
            path: '/studio/videos/live',
            tab: 'live',
        },
        {
            text: 'Danh sách phát',
            path: '/studio/videos/playlist',
            tab: 'playlist',
        },
        {
            text: 'Podcast',
            path: '/studio/videos/podcast',
            tab: 'podcast',
        },
    ];

    const ulRef = useRef(null);
    const lineRef = useRef(null);
    const { tab } = useParams();
    useEffect(() => {
        const ulElement = ulRef.current;
        const lineElement = lineRef.current;
        const index = tabs.findIndex((item) => item.tab === tab);
        if (index === -1) {
            return;
        }
        const element = ulElement.children[index].children[0];
        const ulElementRect = ulElement.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        const ulLetf = ulElementRect.left;
        const elementLeft = elementRect.left;
        const left = elementLeft - ulLetf;
        const width = elementRect.width;

        lineElement.style.left = `${left}px`;
        lineElement.style.width = `${width}px`;
    }, [tab]);
    return (
        <div className={clsx(styles.wrapper)}>
            <TitlePage text={'Nội dung của kênh'} />
            <ul ref={ulRef} className={clsx(styles.tabs)}>
                {tabs.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            className={(nav) => clsx({ [styles.active]: nav.isActive })}
                            to={item.path}
                        >
                            {item.text}
                        </NavLink>
                    </li>
                ))}
                <div ref={lineRef} className={clsx(styles.line)}></div>
            </ul>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.tab, { [styles.show]: tab === 'upload' })}>
                    <Upload tab={tab} />
                </div>
                <div className={clsx(styles.tab, { [styles.show]: tab === 'shorts' })}>
                    <Shorts tab={tab} />
                </div>
                <div className={clsx(styles.tab, { [styles.show]: tab === 'live' })}>
                    <Live tab={tab} />
                </div>
                <div className={clsx(styles.tab, { [styles.show]: tab === 'playlist' })}>
                    <PlayList tab={tab} />
                </div>
                <div className={clsx(styles.tab, { [styles.show]: tab === 'podcast' })}>
                    <Podcast tab={tab} />
                </div>
            </div>
        </div>
    );
}

export default Content;
