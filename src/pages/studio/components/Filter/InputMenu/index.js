import { SlArrowDown } from 'react-icons/sl';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './InputMenu.module.css';
function InputMenu({ code, valueInput = '', handleSetFilterData, handleSetCodeRef }) {
    const [isFocus, setFocus] = useState(false);
    const [isShow, setShow] = useState(false);
    const [value, setValue] = useState(code === 'views' ? ['>=', ''] : valueInput);
    const inputRef = useRef(null);
    useEffect(() => {
        handleSetCodeRef(code);
    }, []);
    const handleSetValue = (valueInput) => {
        if (code === 'views') {
            setValue([value[0], valueInput]);
            handleSetFilterData(code, [value[0], valueInput]);
        } else {
            setValue(valueInput);
            handleSetFilterData(code, valueInput);
        }
    };
    const handleSetValue2 = (value1, value2 = '') => {
        setValue([value1, value2]);
        handleSetFilterData(code, [value1, value2]);
    };
    useEffect(() => {
        if (inputRef) {
            inputRef.current.focus();
        }
    }, []);
    return (
        <div
            className={clsx(styles.wrapper, { [styles.row]: code === 'views' })}
            onClick={() => setShow(!isShow)}
        >
            {code === 'views' ? (
                <div
                    className={clsx(styles.selector, { [styles.focus]: isShow })}
                    onClick={() => setShow(!isShow)}
                >
                    <span>{value[0]}</span>
                    <SlArrowDown size={14} color="#606060" />
                    {isShow && (
                        <ul className={clsx(styles.dropdownMenu)}>
                            <li
                                className={clsx({ [styles.active]: value[0] === '<=' })}
                                onClick={(e) => handleSetValue2(e.target.innerText, value[1])}
                            >
                                {'<='}
                            </li>
                            <li
                                className={clsx({ [styles.active]: value[0] === '>=' })}
                                onClick={(e) => handleSetValue2(e.target.innerText, value[1])}
                            >
                                {'>='}
                            </li>
                        </ul>
                    )}
                </div>
            ) : (
                <div className={clsx(styles.text)}>
                    <span>chứa</span>
                </div>
            )}

            <div
                className={clsx(styles.input, { [styles.focus]: isFocus })}
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    ref={inputRef}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    type="text"
                    placeholder="Giá trị"
                    value={code === 'views' ? value[1] : value}
                    onChange={(e) => handleSetValue(e.target.value)}
                />
            </div>
        </div>
    );
}

export default InputMenu;
