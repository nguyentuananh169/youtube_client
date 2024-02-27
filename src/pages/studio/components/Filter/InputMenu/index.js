import { SlArrowDown } from 'react-icons/sl';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './InputMenu.module.css';
function InputMenu({ code, compLv, valueInput = '', handleSetFilterData, handleSetCodeRef }) {
    const [isFocus, setFocus] = useState(false);
    const [isShow, setShow] = useState(false);
    const [value, setValue] = useState(compLv === 2 ? ['>=', ''] : valueInput);
    const inputRef = useRef(null);
    useEffect(() => {
        handleSetCodeRef(code);
    }, []);
    const handleSetValue = (text) => {
        if (compLv === 2) {
            setValue([value[0], text]);
            handleSetFilterData(code, [value[0], text]);
        } else {
            setValue(text);
            handleSetFilterData(code, text);
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
            className={clsx(styles.wrapper, { [styles.row]: compLv === 2 })}
            onClick={() => setShow(!isShow)}
        >
            {compLv === 2 ? (
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
                    value={compLv === 2 ? value[1] : value}
                    onChange={(e) => handleSetValue(e.target.value)}
                />
            </div>
        </div>
    );
}

export default InputMenu;
