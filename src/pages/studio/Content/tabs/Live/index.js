import clsx from 'clsx';
import Filter from '../../../components/Filter';
import NoData from '../../../components/NoData';
import Table from '../components/Table';
import imgv2 from '../../../../../assets/img/no_content_v2.png';
import styles from './Live.module.css';
import TableTop from './TableTop';
function Live({ tab }) {
    const initFilterData = {
        copyright: false,
        visibility: [],
        mfk_restrictions: [],
        age_restricted: '',
        description: '',
        views: '',
        title: '',
    };
    const initFilterText = {
        copyright: false,
        visibility: [],
        mfk_restrictions: [],
        age_restricted: '',
        description: '',
        views: '',
        title: '',
    };
    const initMenu = [
        {
            id: '1',
            title: 'Bản quyền',
            code: 'copyright',
            valueText: 'Bản quyền',
            isHidden: false,
        },
        {
            id: '2',
            title: 'Chế độ hiển thị',
            code: 'visibility',
            isHidden: false,
            children: {
                code: 'visibility',
                title: 'Chế độ hiển thị',
                validates: { isRequired: true },
                data: [
                    {
                        id: 'v1',
                        tag: 'input',
                        type: 'checkBox',
                        valueText: 'Công khai',
                        valueCode: 'public',
                    },
                    {
                        id: 'v2',
                        tag: 'input',
                        type: 'checkBox',
                        valueText: 'Riêng tư',
                        valueCode: 'private',
                    },
                    {
                        id: 'v3',
                        tag: 'input',
                        type: 'checkBox',
                        valueText: 'Không công khai',
                        valueCode: 'unlisted',
                    },
                    {
                        id: 'v4',
                        tag: 'input',
                        type: 'checkBox',
                        valueText: 'Đã đặt lịch',
                        valueCode: 'has_schedule',
                    },
                    {
                        id: 'v5',
                        tag: 'input',
                        type: 'checkBox',
                        valueText: 'Bản nháp',
                        valueCode: 'draft',
                    },
                ],
            },
        },
        {
            id: '3',
            title: 'Dành cho trẻ em',
            code: 'mfk_restrictions',
            isHidden: false,
            children: {
                code: 'mfk_restrictions',
                title: 'Dành cho trẻ em',
                validates: { isRequired: true },
                data: [
                    {
                        id: 'm1',
                        tag: 'input',
                        type: 'checkBox',
                        titleParent: true,
                        valueText: 'Do bạn đặt',
                        valueCode: 'mfk_set_by_you',
                    },
                    {
                        id: 'm2',
                        tag: 'input',
                        type: 'checkBox',
                        titleParent: true,
                        valueText: 'Do Youtube đặt',
                        valueCode: 'mfk_set_by_youtube',
                    },
                    {
                        id: 'm3',
                        tag: 'input',
                        type: 'checkBox',
                        valueText: 'Không dành cho trẻ em',
                        valueCode: 'not_made_for_kids',
                    },
                    {
                        id: 'm4',
                        tag: 'input',
                        type: 'checkBox',
                        valueText: 'Chưa đặt',
                        valueCode: 'no_selection',
                    },
                ],
            },
        },
        {
            id: '4',
            title: 'Giới hạn về độ tuổi',
            code: 'age_restricted',
            isHidden: false,
            children: {
                code: 'age_restricted',
                title: 'Giới hạn về độ tuổi',
                validates: { isRequired: true },
                data: [
                    {
                        id: 'as1',
                        tag: 'input',
                        type: 'radio',
                        valueText: 'Người xem trên 18 tuổi',
                        valueCode: 'age_restricted',
                    },
                    {
                        id: 'as2',
                        tag: 'input',
                        type: 'radio',
                        valueText: 'Không có giới hạn',
                        valueCode: 'not_age_restricted',
                    },
                ],
            },
        },
        {
            id: '5',
            title: 'Mô tả',
            code: 'description',
            isHidden: false,
            children: {
                code: 'description',
                title: 'Mô tả',
                validates: { isRequired: true },
                isComp: true,
            },
        },
        {
            id: '6',
            title: 'Số lượt xem',
            code: 'views',
            isHidden: false,
            children: {
                code: 'views',
                title: 'Số lượt xem',
                validates: { isRequired: true, isInteger: true },
                isComp: true,
                isSelector: true,
            },
        },
        {
            id: '7',
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
                    img={imgv2}
                    bodyText="Các sự kiện phát trực tiếp của bạn sẽ xuất hiện ở đây"
                    bottomText="Bắt đầu"
                />
            </div>
        </div>
    );
}

export default Live;
