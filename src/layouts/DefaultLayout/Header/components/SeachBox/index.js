import { HiOutlineMicrophone } from 'react-icons/hi';
import { TfiSearch } from 'react-icons/tfi';
import { GoKeyboard } from 'react-icons/go';
import { TfiClose } from 'react-icons/tfi';
import clsx from 'clsx';
import { useState } from 'react';
import Button from '../../../../../components/Button';
import Tooltip from '../../../../../components/Tooltip';
import ResultSearch from './ResultSearch';
import styles from './SearchBox.module.css';
function SearchBox() {
    const [showResult, setShowResult] = useState(false);
    const [valueInput, setValueInput] = useState('');

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.searchBox)}>
                <form
                    className={clsx(styles.form, { [styles.active]: showResult })}
                    onClick={() => setShowResult(true)}
                    onBlur={() => setShowResult(false)}
                >
                    <span className={clsx(styles.iconSearch, styles.btnIcon)}>
                        <TfiSearch />
                    </span>
                    {/* <i
                        className={clsx(
                            'fa-solid fa-magnifying-glass',
                            styles.btnIcon,
                            styles.iconSearch,
                            {
                                [styles.active]: showResult,
                            },
                        )}
                    ></i> */}
                    <input
                        placeholder="Tìm kiếm"
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                    />
                    <div className={clsx(styles.keyboard, styles.btnIcon)}>
                        <GoKeyboard />
                    </div>
                    <div
                        className={clsx(styles.close, styles.btnIcon, {
                            [styles.active]: valueInput,
                        })}
                        onClick={() => setValueInput('')}
                    >
                        <TfiClose />
                    </div>
                    <div
                        className={clsx(styles.dropdown, {
                            [styles.active]: showResult,
                        })}
                    >
                        <ResultSearch />
                    </div>
                </form>
                <div className={clsx(styles.submitBtn)}>
                    <Button>
                        <TfiSearch />
                    </Button>
                    <div className={clsx(styles.tooltip)}>
                        <Tooltip content="Tìm kiếm" />
                    </div>
                </div>
            </div>
            <div className={clsx(styles.voiceBtn)}>
                <Button>
                    <HiOutlineMicrophone />
                </Button>
                <div className={clsx(styles.tooltip)}>
                    <Tooltip content="Tìm kiếm bằng giọng nói" />
                </div>
            </div>
        </div>
    );
}

export default SearchBox;
