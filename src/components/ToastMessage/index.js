import { useDispatch, useSelector } from 'react-redux';
import { removeToastMessage } from '../../store/actions/toastMessage';
import Item from './Item';
import './ToastMessage.css';
function ToastMessage() {
    const dispatch = useDispatch();
    const toastMessageList = useSelector((state) => state.toastMessage);
    const handleRemoveMessage = (id) => {
        dispatch(removeToastMessage(id));
    };
    return (
        <div id="toastMessage">
            {toastMessageList.map((item) => (
                <Item
                    key={item.id}
                    id={item.id}
                    type={item.type}
                    title={item.title}
                    message={item.message}
                    duration={item.duration}
                    handleRemoveMessage={handleRemoveMessage}
                />
            ))}
        </div>
    );
}

export default ToastMessage;
