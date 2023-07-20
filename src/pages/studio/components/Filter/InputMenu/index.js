import { SlArrowDown } from 'react-icons/sl';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './InputMenu.module.css';
function InputMenu({
    isSelector = false,
    code,
    valueInput = '',
    handleSetFilterData,
    handleSetCodeRef,
}) {
    const [isFocus, setFocus] = useState(false);
    const [isShow, setShow] = useState(false);
    const [value, setValue] = useState(valueInput);
    const inputRef = useRef(null);
    useEffect(() => {
        handleSetCodeRef(code);
    }, []);
    const handleSetValue = (valueInput) => {
        setValue(valueInput);

        handleSetFilterData(code, valueInput);
    };
    useEffect(() => {
        if (inputRef) {
            inputRef.current.focus();
        }
    }, []);
    return (
        <div
            className={clsx(styles.wrapper, { [styles.row]: isSelector })}
            onClick={() => setShow(!isShow)}
        >
            {isSelector ? (
                <div
                    className={clsx(styles.selector, { [styles.focus]: isShow })}
                    onClick={() => setShow(!isShow)}
                >
                    <span>{'>='}</span>
                    <SlArrowDown size={14} color="#606060" />
                    {isShow && (
                        <ul className={clsx(styles.dropdownMenu)}>
                            <li>{'>='}</li>
                            <li className={clsx(styles.active)}>{'<='}</li>
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
                    value={value}
                    onChange={(e) => handleSetValue(e.target.value)}
                />
            </div>
        </div>
    );
}

export default InputMenu;
