import { TfiClose } from 'react-icons/tfi';

import { useState } from 'react';
import clsx from 'clsx';
import styles from './TabImage.module.css';
import SelectFiles from './SelectFiles';
import ShowFiles from './ShowFiles';
function TabImage({ errors, removeError, valueForm, setValueForm, invalid, handleCloseTab }) {
    const [isNext, setIsNext] = useState(false);
    const handleChangeInput = (e) => {
        invalid('imgs', e.target.files);
        setValueForm({ ...valueForm, imgs: e.target.files });
        setIsNext(true);
    };
    const handleClickInput = (e) => {
        setIsNext(false);
        removeError('imgs');
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.close)} onClick={() => handleCloseTab('imgs')}>
                <TfiClose size={17} />
            </div>
            {isNext && !errors.imgs ? (
                <ShowFiles imgs={valueForm.imgs} />
            ) : (
                <SelectFiles
                    errors={errors}
                    handleChangeInput={handleChangeInput}
                    handleClickInput={handleClickInput}
                />
            )}
        </div>
    );
}

export default TabImage;
