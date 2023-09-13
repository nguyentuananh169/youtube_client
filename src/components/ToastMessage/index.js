import useStore from '../../hook/useStore';
import { removeToastMessage } from '../../store/actions';
import Item from './Item';
import './ToastMessage.css';
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
