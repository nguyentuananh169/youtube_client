import { RxDotFilled } from 'react-icons/rx';
import { MdOutlineUnfoldMore } from 'react-icons/md';
import { TfiClose } from 'react-icons/tfi';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Comments.module.css';
import CommentList from './components/CommentList';
import Filter from './components/Filter';
import Form from './components/Form';
import DotMenu from '../../../../components/DotMenu';
function Comments() {
    const [isShow, setIsShow] = useState(false);
    const overlayRef = useRef(null);
    useEffect(() => {
        if (isShow) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isShow]);
    const handleClickBtnComments = () => {
        if (!isShow) {
            setIsShow(true);
        }
    };
    const handleClickIcon = (e) => {
        e.stopPropagation();
        if (isShow) {
            setIsShow(false);
        }
    };
    return (
        <>
            {isShow && <div ref={overlayRef} className={clsx(styles.overlay)}></div>}
            <div className={clsx(styles.wrapper, { [styles.show]: isShow })}>
                <div className={clsx(styles.btnComments)} onClick={handleClickBtnComments}>
                    <div className={clsx(styles.text)}>
                        <span>Bình luận</span>
                        {!isShow && <RxDotFilled size={10} />}
                        <span>91</span>
                    </div>

                    <div className={clsx(styles.icon)} onClick={handleClickIcon}>
                        {isShow ? (
                            <DotMenu icon={<TfiClose size={20} color="#606060" />} />
                        ) : (
                            <MdOutlineUnfoldMore size={20} color="#606060" />
                        )}
                    </div>
                </div>
                <div className={clsx(styles.main)}>
                    <Filter />
                    <Form />
                    <CommentList />
                </div>
            </div>
        </>
    );
}

export default Comments;
