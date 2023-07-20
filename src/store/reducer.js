import {
    IS_TOGGLE_NAVBAR,
    IS_HIDDEN_HEADER,
    IS_HIDDEN_HEADER2,
    IS_TOGGLE_NAVBAR2,
    ADD_TOAST_MESSAGE,
    REMOVE_TOAST_MESSAGE,
    CHANGE_USER_IFO,
    CHECK_LOGIN,
} from './constants';

const initState = {
    isToggleNavbar: false,
    isToggleNavbar2: false,
    isHiddenHeader: false,
    isHiddenHeader2: false,
    isLogin: false,
    isCheckLogin: true,
    toastMessages: [],
    user: null,
};
const reducer = (state, action) => {
    switch (action.type) {
        case IS_TOGGLE_NAVBAR:
            if (action.payload === undefined || action.payload === null) {
                return { ...state, isToggleNavbar: !state.isToggleNavbar };
            }
            return { ...state, isToggleNavbar: action.payload };
        case IS_TOGGLE_NAVBAR2:
            if (action.payload === undefined || action.payload === null) {
                return { ...state, isToggleNavbar2: !state.isToggleNavbar2 };
            }
            return { ...state, isToggleNavbar2: action.payload };
        case IS_HIDDEN_HEADER:
            if (action.payload === undefined || action.payload === null) {
                return { ...state, isHiddenHeader: !state.isHiddenHeader };
            }
            return { ...state, isHiddenHeader: action.payload };
        case IS_HIDDEN_HEADER2:
            if (action.payload === undefined || action.payload === null) {
                return { ...state, isHiddenHeader2: !state.isHiddenHeader2 };
            }
            return { ...state, isHiddenHeader: action.payload };
        case ADD_TOAST_MESSAGE:
            const arr = [...state.toastMessages];
            if (arr.length >= 4) {
                arr.shift();
                arr.push(action.payload);
            } else {
                arr.push(action.payload);
            }
            return { ...state, toastMessages: arr };
        case REMOVE_TOAST_MESSAGE:
            const arr2 = [...state.toastMessages];
            const arrAfterRemove = arr2.filter((item) => item.id !== action.payload);
            return { ...state, toastMessages: arrAfterRemove };
        case CHANGE_USER_IFO:
            return { ...state, user: action.payload, isLogin: !!action.payload };
        case CHECK_LOGIN:
            return { ...state, isCheckLogin: action.payload };
        default:
            return state;
    }
};
export { initState };
export default reducer;
