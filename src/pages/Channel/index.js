import clsx from 'clsx';
import styles from './Channel.module.css';
import Banner from './components/Banner';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Main from './components/Main';
function Channel() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.banner)}>
                <Banner />
            </div>
            <div className={clsx(styles.header)}>
                <Header />
            </div>
            <div className={clsx(styles.tabs)}>
                <Tabs />
            </div>
            <div className={clsx(styles.main)}>
                <Main />
            </div>
        </div>
    );
}

export default Channel;
