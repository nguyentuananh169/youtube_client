import { ADD_TOAST_MESSAGE, REMOVE_TOAST_MESSAGE } from '../constants';
const initialState = [];
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOAST_MESSAGE:
            const arr = [...state];
            if (arr.length >= 4) {
                arr.shift();
                arr.push(action.payload);
            } else {
                arr.push(action.payload);
            }
            return arr;
        case REMOVE_TOAST_MESSAGE:
            const arr2 = [...state];
            const arrAfterRemove = arr2.filter((item) => item.id !== action.payload);
            return arrAfterRemove;
        default:
            return state;
    }
};
export default reducer;
