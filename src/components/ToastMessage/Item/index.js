import { TfiClose } from 'react-icons/tfi';
import './Item.css';
function Item({ id, type, title, message, duration, handleRemoveMessage }) {
    const animationStyle = `slideLeftToRight 0.3s linear, slideRightToLeft 0.3s ${
        duration / 1000
    }s linear forwards`;
    const animationTimeLine = `runTimeLine ${duration / 1000}s linear forwards`;
    return (
        <div className={`toastItem ${type}`} style={{ animation: animationStyle }}>
            <div className="body">
                <div className="line"></div>
                <div className="content">
                    <div className="title">
                        <strong>{title}</strong>
                    </div>
                    <div className="message">
                        <span>{message}</span>
                    </div>
                </div>
                <div className="close">
                    <TfiClose onClick={() => handleRemoveMessage(id)} />
                </div>
                <div className="timeLine" style={{ animation: animationTimeLine }}></div>
            </div>
        </div>
    );
}

export default Item;
