import { TfiClose } from 'react-icons/tfi';
import './Item.css';
import { useEffect, useRef, useState } from 'react';
function Item({ id, type, title, message, duration, handleRemoveMessage }) {
    const animationStyle = `slideLeftToRight 0.3s linear, slideRightToLeft 0.3s ${
        duration / 1000
    }s linear forwards`;
    const animationTimeLine = `runTimeLine ${duration / 1000}s linear forwards`;
    const [isHidden, setIsHidden] = useState(false);
    const timeoutRef = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            setIsHidden(true);
        }, +duration + 300);
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);
    return (
        <div
            className={`toastItem ${type} ${isHidden && 'hidden'}`}
            style={{ animation: animationStyle }}
        >
            <div className="body">
                <div className="content">
                    <div className="message">
                        <span>{message}</span>
                    </div>
                </div>
                <div className="close">
                    <TfiClose
                        cursor="pointer"
                        color="#fff"
                        onClick={() => handleRemoveMessage(id)}
                    />
                </div>
                <div className="timeLine" style={{ animation: animationTimeLine }}></div>
            </div>
        </div>
    );
}

export default Item;
