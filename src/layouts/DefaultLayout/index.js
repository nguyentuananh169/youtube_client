import clsx from 'clsx';
import Header from './Header';
import Left from './Left';
import Right from './Right';

import styles from './DefaultLayout.module.css';

function DefaultLayout({ children, isHideNavbar }) {
    return (
        <>
            <Header />
            <div className={clsx(styles.main)}>
                <Left isHideNavbar={isHideNavbar} />
                <Right isFullWidth={isHideNavbar}>{children}</Right>
            </div>
        </>
    );
}

export default DefaultLayout;
