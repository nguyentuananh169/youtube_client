import { BiLike, BiDislike } from 'react-icons/bi';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import clsx from 'clsx';
import styles from './CommentList.module.css';
import Button from '../../../../../../components/Button';
import Form from '../Form';
import { useState } from 'react';
function ItemList({ item }) {
    const [isShowForm, setShowForm] = useState(false);
    const [isMore, setMore] = useState(false);
    return (
        <div className={clsx(styles.itemList)}>
            <div className={clsx(styles.avatar)}>
                <img src={item.avatar} />
            </div>
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.name)}>
                    <strong>{item.name}</strong>
                    <span>{item.time}</span>
                </div>
                <div className={clsx(styles.content)}>
                    <span>{item.content}</span>
                </div>
                <div className={clsx(styles.actions)}>
                    <div className={clsx(styles.btn)}>
                        <Button>
                            <BiLike />
                        </Button>
                        {item.like > 0 && <span>{item.like}</span>}
                    </div>
                    <div className={clsx(styles.btn)}>
                        <Button>
                            <BiDislike />
                        </Button>
                        {item.dislike > 0 && <span>{item.dislike}</span>}
                    </div>
                    <div className={clsx(styles.btn, styles.reply)}>
                        <Button onClick={() => setShowForm(!isShowForm)}>Phản hồi</Button>
                    </div>
                </div>
                {isShowForm && <Form lv2 />}
                {item.reply.length > 0 && (
                    <div className={clsx(styles.btnMore)}>
                        <Button onClick={() => setMore(!isMore)}>
                            {isMore ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                            {`${item.reply.length} phản hồi`}
                        </Button>
                    </div>
                )}
                {isMore &&
                    item.reply.map((item, index) => (
                        <div key={index} className={clsx(styles.itemList, styles.itemLv2)}>
                            <div className={clsx(styles.avatar)}>
                                <img src={item.avatar} />
                            </div>
                            <div className={clsx(styles.info)}>
                                <div className={clsx(styles.name)}>
                                    <strong>{item.name}</strong>
                                    <span>{item.time}</span>
                                </div>
                                <div className={clsx(styles.content)}>
                                    <span>{item.content}</span>
                                </div>
                                <div className={clsx(styles.actions)}>
                                    <div className={clsx(styles.btn)}>
                                        <Button>
                                            <BiLike />
                                        </Button>
                                        {item.like > 0 && <span>{item.like}</span>}
                                    </div>
                                    <div className={clsx(styles.btn)}>
                                        <Button>
                                            <BiDislike />
                                        </Button>
                                        {item.dislike > 0 && <span>{item.dislike}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ItemList;
