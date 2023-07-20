import { RxDotsVertical } from 'react-icons/rx';
import clsx from 'clsx';
import styles from './Wellcome.module.css';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import DotMenu from '../../../../components/DotMenu';
import useClickOutSide from '../../../../hook/useClickOutSide';
import MenuFixed from '../../../../components/MenuFixed';
function Wellcome() {
    const menuList = [{ text: 'Báo cáo' }];
    const [elementRef, isShow, setShow] = useClickOutSide();
    return (
        <div className={clsx(styles.wrapper)}>
            <Card title={'Ý tưởng cho bạn'}>
                <div className={clsx(styles.title)}>
                    <strong>Bạn mới bắt đầu tạo kênh trên YouTube?</strong>
                </div>
                <div className={clsx(styles.body)}>
                    <span className={clsx(styles.text)}>
                        Chào mừng bạn đến với YouTube! Chúng tôi có một số mẹo giúp bạn tải video
                        lên kênh của mình. Hãy tìm hiểu ngay những kiến thức cơ bản để thiết lập
                        kênh của bạn!
                    </span>
                    <img src="https://www.gstatic.com/youtube/img/promos/growth/3dcbeefeab5e82687817c0c8499fee91836836f78d8e5b978790b979a8308b92_160x160.png" />
                </div>
                <div className={clsx(styles.linkBtn)}>
                    <Link to={'#'}>Đưa tôi đến đó</Link>
                    <div
                        className={clsx(styles.dotBtn)}
                        ref={elementRef}
                        onClick={() => setShow(!isShow)}
                    >
                        <DotMenu icon={<RxDotsVertical size={17} />} />
                        {isShow && (
                            <MenuFixed
                                menulist={menuList}
                                customStyle={{ width: '128px', minWidth: '128px' }}
                            />
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Wellcome;
