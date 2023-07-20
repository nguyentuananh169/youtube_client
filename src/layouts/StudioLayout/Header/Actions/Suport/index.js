import { TfiHelpAlt } from 'react-icons/tfi';

import { useState } from 'react';
import clsx from 'clsx';
import DropdownMenu from './DopdownMenu';
import styles from './Suport.module.css';
import Tooltip from '../../../../../components/Tooltip';
function Suport() {
    const [isShow, setShow] = useState(false);
    const handleClickShow = () => {
        setShow(!isShow);
    };
    return (
        <>
            <div className={clsx(styles.wrapper)} onClick={handleClickShow}>
                <Tooltip
                    content={'Trợ giúp'}
                    customStyle={{
                        top: 'calc(100% + 15px)',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        whiteSpace: 'nowrap',
                        fontSize: '1rem',
                        padding: '5px 8px',
                    }}
                />
                <TfiHelpAlt fontSize={18} color="#6a6a6a" />
            </div>
            {isShow && <DropdownMenu isShow={isShow} setShow={setShow} />}
        </>
    );
}

export default Suport;
