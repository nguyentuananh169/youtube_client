import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Header from './Header';
import Left from './Left';
import Right from './Right';

import styles from './DefaultLayout.module.css';
import { useLocation } from 'react-router-dom';

function DefaultLayout({ isMobile = false, children }) {
    const [isToggleGuide, setToogle] = useState(false);
    const [guideType, setGuideType] = useState('full');
    const handleToggleGuide = () => {
        setToogle(!isToggleGuide);
    };
    const handleChangeGuideType = () => {
        const widthScreen = window.innerWidth;
        if (widthScreen <= 1312 && widthScreen >= 769) {
            setGuideType('mini');
        } else if (widthScreen <= 768) {
            setGuideType('hidden');
        } else {
            setGuideType('full');
        }
    };
    useEffect(() => {
        window.addEventListener('resize', handleChangeGuideType);
        return () => {
            window.removeEventListener('resize', handleChangeGuideType);
        };
    }, []);
    useEffect(() => {
        handleChangeGuideType();
    }, []);
    return (
        <>
            <Header handleToggleGuide={handleToggleGuide} />
            <div className={clsx(styles.main)}>
                <Left
                    isToggleGuide={isToggleGuide}
                    guideType={guideType}
                    handleToggleGuide={handleToggleGuide}
                />
                <Right isToggleGuide={isToggleGuide} guideType={guideType}>
                    {children}
                </Right>
            </div>
        </>
    );
}

export default DefaultLayout;
