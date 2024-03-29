import { SlClose } from 'react-icons/sl';
import clsx from 'clsx';
import Tooltip from '../../../../../components/Tooltip';
import styles from './FilterList.module.css';
function FilterList({ item, handleRemoveFilterList }) {
    let text = item.title;
    const valueType = item.valueType;
    switch (valueType) {
        case 'boolean':
            break;
        case 'text':
            text = `${text} "${item.valueText}"`;
            break;
        case 'array_to_string_with_commas':
            const arr = item.valueText;
            if (arr.length >= 3) {
                const slicedArray = arr.slice(0, 2);
                const arrToString = slicedArray.join(', ');
                text = `${text}: ${arrToString}, +${arr.length - 2} lựa chọn khác`;
            } else {
                const arrToString = item.valueText.join(', ');
                text = `${text}: ${arrToString}`;
            }
            break;
        case 'array_to_string_with_out_commas':
            text = `${text} ${item.valueText[0]} ${item.valueText[1]}`;
            break;

        default:
            break;
    }

    return (
        <button className={clsx(styles.itemBtn)}>
            <div className={clsx(styles.text)}>
                <Tooltip
                    data-class="tooltip"
                    content={text}
                    customStyle={{
                        whiteSpace: 'pre-line',
                        top: 'calc(100% + 17px)',
                        left: '0',
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
