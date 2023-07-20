import { useContext } from 'react';
import Context from '../store/Context';
const useStore = () => {
    const [state, distpatch] = useContext(Context);
    return [state, distpatch];
};
export default useStore;
