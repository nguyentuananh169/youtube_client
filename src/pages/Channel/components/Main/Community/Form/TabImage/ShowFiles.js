import clsx from 'clsx';
import styles from './TabImage.module.css';
import { useEffect, useState } from 'react';
function ShowFiles({ imgs }) {
    const [linkImgs, setLinkImgs] = useState([]);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        if (imgs.length > 0) {
            const arr = [];
            for (let i = 0; i < imgs.length; i++) {
                const link = URL.createObjectURL(imgs[i]);
                arr.push(link);
            }
            setLinkImgs(arr);
        }
    }, [imgs]);
    useEffect(() => {
        return () => {
            for (let i = 0; i < linkImgs.length; i++) {
                URL.revokeObjectURL(linkImgs[i]);
            }
        };
    }, [linkImgs]);
    return (
        <div className={clsx(styles.showFiles)}>
            <div className={clsx(styles.left)}>
                <div className={clsx(styles.img)}>
                    {linkImgs.map((item, index) => (
                        <img key={index} src={item} onClick={() => setIndex(index)} />
                    ))}
                </div>
            </div>
            <div className={clsx(styles.right)}>
                <img src={linkImgs[index]} />
            </div>
        </div>
    );
}

export default ShowFiles;
