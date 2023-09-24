import { GrPrevious, GrNext } from 'react-icons/gr';
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
    const handleNext = () => {
        if (index < linkImgs.length - 1) {
            setIndex(index + 1);
        }
    };
    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };
    return (
        <div className={clsx(styles.showFiles)}>
            <div className={clsx(styles.left)}>
                <div className={clsx(styles.img)}>
                    <div className={clsx(styles.aspectRatio)}>
                        {linkImgs.map((item, index) => (
                            <img key={index} src={item} onClick={() => setIndex(index)} />
                        ))}
                    </div>
                </div>
            </div>
            <div className={clsx(styles.right)}>
                <button
                    type="button"
                    className={clsx(styles.btnSl, styles.prev, { [styles.hidden]: index <= 0 })}
                    onClick={handlePrev}
                >
                    <GrPrevious />
                </button>
                <button
                    type="button"
                    className={clsx(styles.btnSl, styles.next, {
                        [styles.hidden]: index >= linkImgs.length - 1,
                    })}
                    onClick={handleNext}
                >
                    <GrNext size={17} />
                </button>
                <img src={linkImgs[index]} />
            </div>
        </div>
    );
}

export default ShowFiles;
