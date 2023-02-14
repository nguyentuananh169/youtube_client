import clsx from 'clsx';
import ItemList from './ItemList';
import styles from './CommentList.module.css';
function CommentList() {
    const data = [
        {
            avatar: 'https://yt3.ggpht.com/ytc/AMLnZu_S_APXAFYn0ORq_40NxEXID4HtaQ_zjVT1rzfj=s48-c-k-c0x00ffffff-no-rj',
            name: 'Tiến Đỗ',
            time: '13 giờ trước',
            content:
                'Tập này 2 đội giỏi quá. Ko có trả lời kiểu ngớ nga ngớ ngẩn, Quốc Thiên trả lời bình tĩnh giỏi thật sự!!',
            like: 32,
            dislike: 0,
            reply: [
                {
                    avatar: 'https://yt3.ggpht.com/ytc/AMLnZu97jiZPdwmjpIXToZ7R84XpShxowgtbllAQWQ=s48-c-k-c0x00ffffff-no-rj',
                    name: 'Thuỳ Linh',
                    time: '11 giờ trước',
                    content:
                        'Mê chương trình này lắm luôn rồi,kakaka. Bà Dạ duyên dáng dễ thương,bả với Giang Ca dẫn ct ok lắm luôn dân hài nên quăng miếng cực duyên,tập này ai cũng giỏi hết,triệu like nha!',
                    like: 67,
                    dislike: 0,
                },
                {
                    avatar: 'https://yt3.ggpht.com/ytc/AMLnZu-WwTiDwxSpm-AxdGeAuoNy6oJmuSJh2OfcUg=s48-c-k-c0x00ffffff-no-rj',
                    name: 'Ly Bui',
                    time: '11 giờ trước',
                    content:
                        'Vỹ Dạ mới dẫn chương trình có mấy số nhưng rất duyên, và hay hơn nhiều. ủng hộ bà dạ làm MC với trường giang trong chương trình này .',
                    like: 0,
                    dislike: 0,
                },
            ],
        },
        {
            avatar: 'https://yt3.ggpht.com/ytc/AMLnZu9qudX48Kr4IKLOylAUNtsFvn-AzDe_v5GZGJu6=s48-c-k-c0x00ffffff-no-rj',
            name: 'Mỹ Linh Phùng',
            time: '5 giờ trước',
            content: 'Haha mắc cười chị Dạ đọc câu cẩu thả nhấn quá trời nhấn',
            like: 14,
            dislike: 0,
            reply: [
                {
                    avatar: 'https://www.youtube.com/channel/UCUd3K7uu9R3Q0f7NsMRbSPA',
                    name: 'Nhung Nguyễn',
                    time: '4 giờ trước',
                    content:
                        'Quốc Thiên có chất giọng trời phú đặc biệt nghe là mê, lại còn thông minh bình tĩnh nữa',
                    like: 0,
                    dislike: 0,
                },
                {
                    avatar: 'https://yt3.ggpht.com/ytc/AMLnZu-yzzMa1BPVZ_Y1XOItSmpjxbV5x82_6WNteGlR1pZzX7rIk6N-7nNjLr1VZ30R=s48-c-k-c0x00ffffff-no-rj',
                    name: 'bxin',
                    time: '4 giờ trước',
                    content:
                        'Soái ca Đà Nẵng đã đẹp trai rồi còn hiền mà thông minh nữa👍👍👍👍👍👍👍👍👍👍👍',
                    like: 5,
                    dislike: 1,
                },
            ],
        },
    ];
    return (
        <div className={clsx(styles.commentContainer)}>
            {data.map((item, index) => (
                <ItemList key={index} item={item} />
            ))}
        </div>
    );
}

export default CommentList;
