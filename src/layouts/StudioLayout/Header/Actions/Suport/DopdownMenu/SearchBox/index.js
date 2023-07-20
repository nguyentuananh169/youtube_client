import { HiOutlineSearch } from 'react-icons/hi';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import useClickOutSide from '../../../../../../../hook/useClickOutSide';
import Tooltip from '../../../../../../../components/Tooltip';
import Suggest from './Suggest';
import Result from './Result';
import styles from './SearchBox.module.css';
function SearchBox({ tabSearch, setTabSearch }) {
    const [isLoading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [resultList, setResultList] = useState([]);
    const [elementRef, isShow, setShow] = useClickOutSide(false);

    const inputRef = useRef(null);
    const resultData = [
        {
            title: 'Bật hoặc tắt Chế độ hạn chế trên YouTube',
            des: 'Chế độ hạn chế là chế độ cài đặt không bắt buộc trên YouTube. Chế độ này thể giúp lọc ra nội dung',
        },
        {
            title: 'Nhúng video và danh sách phát',
            des: 'Bạn thể dùng tính năng nhúng để thêm video hoặc danh sách phát trên YouTube vào một trang web hoặc trang blog',
        },
        {
            title: 'Tôi có thể kiếm tiền từ loại nội dung nào?',
            des: 'Tuân thủ Nguyên tắc cộng đồng của YouTube. Tự bạn tạo tất cả các thành phần trong video. Ví dụ: Vlog hằng ngày; Video gia đình; Video hướng dẫn tự làm ...',
        },
    ];
    useEffect(() => {
        if (tabSearch) {
            inputRef.current.focus();
        } else {
            setValue('');
            setResultList([]);
        }
    }, [tabSearch]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setShow(false);
        const formatValue = value.trim();
        if (!tabSearch || isLoading || !formatValue) {
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setResultList(resultData);
        }, 2000);
    };
    const handleChangeInput = (text) => {
        setShow(true);
        setValue(text);
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.form)}>
                <form
                    ref={elementRef}
                    className={clsx({ [styles.tabSearch]: tabSearch })}
                    onClick={() => setTabSearch(true)}
                    onSubmit={handleSubmit}
                >
                    <button>
                        {isLoading ? (
                            <span className={clsx(styles.loading)}></span>
                        ) : (
                            <>
                                <Tooltip
                                    content={'Tìm kiếm'}
                                    customStyle={{
                                        top: 'calc(100% + 15px)',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        whiteSpace: 'nowrap',
                                        backgroundColor: '#000',
                                        fontSize: '1.1rem',
                                        padding: '6px 9px',
                                    }}
                                />
                                <HiOutlineSearch size={18} color="#000" />
                            </>
                        )}
                    </button>
                    {tabSearch ? (
                        <>
                            <input
                                ref={inputRef}
                                type="text"
                                value={value}
                                placeholder="Tìm kiếm trong trợ giúp"
                                onChange={(e) => handleChangeInput(e.target.value)}
                            />
                            {isShow && value.trim() && (
                                <Suggest valueInput={value} handleSubmit={handleSubmit} />
                            )}
                        </>
                    ) : (
                        <span className={clsx(styles.text)}>Tìm kiếm trong trợ giúp</span>
                    )}
                </form>
            </div>
            {tabSearch && <Result resultList={resultList} setShow={setShow} />}
        </div>
    );
}

export default SearchBox;
