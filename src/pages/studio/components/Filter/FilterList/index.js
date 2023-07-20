import { SlClose } from 'react-icons/sl';
import clsx from 'clsx';
import Tooltip from '../../../../../components/Tooltip';
import styles from './FilterList.module.css';
function FilterList({ item, handleRemoveFilterList }) {
    let text = item.title;
    if (item.code === 'copyright') {
    } else if (Array.isArray(item.valueText)) {
        const arr = item.valueText;
        if (arr.length >= 3) {
            const slicedArray = arr.slice(0, 2);
            const arrToString = slicedArray.join(', ');
            text = `${text}: ${arrToString}, +${arr.length - 2} lựa chọn khác`;
        } else {
            const arrToString = item.valueText.join(', ');
            text = `${text}: ${arrToString}`;
        }
    } else {
        text = `${text} "${item.valueText}"`;
    }
    return (
        <button className={clsx(styles.itemBtn)}>
            <div className={clsx(styles.text)}>
                <Tooltip
                    data-class="tooltip"
                    content={text}
                    customStyle={{
                        maxWidth: '290px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        top: 'calc(100% + 17px)',
                        left: '0',
                        whiteSpace: 'nowrap',
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        padding: '7px',
                        backgroundColor: '#848484',
                        zIndex: '1',
                    }}
                />
                <span>{text}</span>
            </div>
            <div
                className={clsx(styles.remove)}
                onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFilterList(item.code);
                }}
            >
                <Tooltip
                    data-class="tooltip"
                    content={'Xóa'}
                    customStyle={{
                        top: 'calc(100% + 13px)',
                        left: '0',
                        whiteSpace: 'nowrap',
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        padding: '7px',
                        backgroundColor: '#848484',
                        zIndex: '1',
                    }}
                />
                <SlClose size={17} />
            </div>
        </button>
    );
}

export default FilterList;
