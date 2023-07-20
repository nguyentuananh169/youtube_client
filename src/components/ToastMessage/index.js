import useStore from '../../hook/useStore';
import './ToastMessage.css';
import Item from './Item';
import { removeToastMessage } from '../../store/actions';
function ToastMessage() {
    const [store, dispatch] = useStore();
    const handleRemoveMessage = (id) => {
        dispatch(removeToastMessage(id));
    };
    return (
        <div id="toastMessage">
            {store.toastMessages.map((item) => (
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
