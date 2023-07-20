import { BsFillPencilFill } from 'react-icons/bs';
import { MdOpenInNew } from 'react-icons/md';
import { HiOutlineSearch } from 'react-icons/hi';

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Suggest.module.css';
function Suggest({ valueInput }) {
    return (
        <ul className={clsx(styles.suggest)}>
            {Array(3)
                .fill(0)
                .map((item, index) => (
                    <li key={index}>
                        <Link to={'#'}>
                            <BsFillPencilFill size={15} color="#0b57d0" />
                            <span>
                                Đây là kết quả tìm kiếm "{valueInput}"
                                <MdOpenInNew size={13} color="#0b57d0" />
                            </span>
                        </Link>
                    </li>
                ))}
            {Array(2)
                .fill(0)
                .map((item, index) => (
                    <li key={index} className={clsx({ [styles.bor]: index === 0 })}>
                        <Link to={'#'}>
                            <HiOutlineSearch size={17} color="#A4A4A4" />
                            <span>Từ khóa gợi ý tìm kiếm "{valueInput}"</span>
                        </Link>
                    </li>
                ))}
        </ul>
    );
}

export default Suggest;
