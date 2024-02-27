import { CHANGE_USER_IFO, CHECK_LOGIN } from '../constants';
const initialState = {
    isLogin: false,
    isCheckLogin: true,
    user: null,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USER_IFO:
            return { ...state, user: action.payload, isLogin: !!action.payload };
        case CHECK_LOGIN:
            return { ...state, isCheckLogin: action.payload };
        default:
            return state;
    }
};
export default reducer;
