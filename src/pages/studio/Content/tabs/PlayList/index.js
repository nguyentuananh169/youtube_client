import clsx from 'clsx';
import NoData from '../../../components/NoData';
import Filter from '../../../components/Filter';
import imgV3 from '../../../../../assets/img/no_content_v3.png';
import styles from './PlayList.module.css';
import Table from '../components/Table';
import TableTop from './TableTop';
function PlayList({ tab }) {
    const initFilterData = {
        title: '',
    };
    const initFilterText = {
        title: '',
    };
    const initMenu = [
        {
            id: '1',
            title: 'Tiêu đề',
            code: 'title',
            isHidden: false,
            children: {
                code: 'title',
                title: 'Tiêu đề',
                validates: { isRequired: true },
                isComp: true,
            },
        },
    ];
    return (
        <div className={clsx(styles.wrapper)}>
            <Filter
                initMenu={initMenu}
                initFilterData={initFilterData}
                initFilterText={initFilterText}
            />
            <div className={clsx(styles.body)}>
                {/* <Table>
                    <TableTop tab={tab} />
                </Table> */}
                <NoData
                    img={imgV3}
                    bodyText="Hãy tạo danh sách phát rồi thêm những nội dung hiện có hoặc tải video mới lên."
                    bottomText="Danh sách phát mới"
                    isBottomBtn
                />
            </div>
        </div>
    );
}

export default PlayList;
