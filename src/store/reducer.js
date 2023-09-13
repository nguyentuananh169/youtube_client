import {
    IS_TOGGLE_NAVBAR,
    IS_HIDDEN_HEADER,
    IS_HIDDEN_HEADER2,
    IS_TOGGLE_NAVBAR2,
    ADD_TOAST_MESSAGE,
    REMOVE_TOAST_MESSAGE,
    CHANGE_USER_IFO,
    CHECK_LOGIN,
    NEXT_VIDEO_INFO,
    ADD_SUBSCRIPTION_LIST,
    DELETE_SUBSCRIPTION,
    ADD_SUBSCRIPTION,
    OPEN_PICTURE_IN_PICTURE,
    CLOSE_PICTURE_IN_PICTURE,
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
    nextVideoInfo: {},
    subscriptionList: [],
    pictureInPicture: {
        isOpen: false,
        videoData: {},
    },
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
        case NEXT_VIDEO_INFO:
            return { ...state, nextVideoInfo: action.payload };
        case ADD_SUBSCRIPTION_LIST:
            return { ...state, subscriptionList: action.payload };
        case ADD_SUBSCRIPTION:
            const subList = [...state.subscriptionList];
            if (subList.length > 10) {
                subList.pop();
            }
            subList.unshift(action.payload);
            return { ...state, subscriptionList: subList };
        case DELETE_SUBSCRIPTION:
            const subList2 = [...state.subscriptionList];
            const subList3 = subList2.filter((item) => item.user_id !== action.payload);
            return { ...state, subscriptionList: subList3 };
        case OPEN_PICTURE_IN_PICTURE:
            const obj = {
                isOpen: true,
                videoData: action.payload,
            };
            return { ...state, pictureInPicture: obj };
        case CLOSE_PICTURE_IN_PICTURE:
            const obj2 = {
                isOpen: false,
                videoData: {},
            };
            return { ...state, pictureInPicture: obj2 };
        default:
            return state;
    }
};
export { initState };
export default reducer;
