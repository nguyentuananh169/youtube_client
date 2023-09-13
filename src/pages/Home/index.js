import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Home.module.css';
import Category from './Components/Category';
import ListVideo from './Components/ListVideo';

function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    useEffect(() => {
        setIsLoading(true);
    }, [categoryId]);
    return (
        <div className={clsx(styles.wrapper)}>
            {isLoading && <div className={clsx(styles.loading)}></div>}
            <Category setCategoryId={setCategoryId} />
            <ListVideo
                categoryId={categoryId}
                setIsLoadingHome={setIsLoading}
                isLoadingHome={isLoading}
            />
        </div>
    );
}

export default Home;
