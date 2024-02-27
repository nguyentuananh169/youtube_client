import { ADD_SUBSCRIPTION_LIST, ADD_SUBSCRIPTION, DELETE_SUBSCRIPTION } from '../constants';
const initialState = [];
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SUBSCRIPTION_LIST:
            return action.payload;
        case ADD_SUBSCRIPTION:
            const subList = [...state];
            if (subList.length >= 5) {
                subList.pop();
            }
            subList.unshift(action.payload);
            return subList;
        case DELETE_SUBSCRIPTION:
            const subList2 = [...state];
            const subList3 = subList2.filter((item) => item.user_id !== action.payload);
            return subList3;
        default:
            return state;
    }
};
export default reducer;
