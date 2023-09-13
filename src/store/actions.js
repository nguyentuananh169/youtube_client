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
    ADD_SUBSCRIPTION,
    ADD_SUBSCRIPTION_LIST,
    DELETE_SUBSCRIPTION,
    OPEN_PICTURE_IN_PICTURE,
    CLOSE_PICTURE_IN_PICTURE,
} from './constants';

export const setIsToggleNavBar = (payload) => {
    return {
        type: IS_TOGGLE_NAVBAR,
        payload,
    };
};
export const setIsToggleNavBar2 = (payload) => {
    return {
        type: IS_TOGGLE_NAVBAR2,
        payload,
    };
};
export const setIsHiddenHeader = (payload) => {
    return {
        type: IS_HIDDEN_HEADER,
        payload,
    };
};
export const setIsHiddenHeader2 = (payload) => {
    return {
        type: IS_HIDDEN_HEADER2,
        payload,
    };
};
export const addToastMessage = (type = 'dark', title = '', message = '', duration = '3000') => {
    const currentTime = new Date().getTime();
    return {
        type: ADD_TOAST_MESSAGE,
        payload: {
            id: currentTime,
            type,
            title,
            message,
            duration: duration,
        },
    };
};
export const removeToastMessage = (payload) => {
    return {
        type: REMOVE_TOAST_MESSAGE,
        payload,
    };
};
export const changeUserInfo = (payload) => {
    return {
        type: CHANGE_USER_IFO,
        payload,
    };
};
export const checkLogin = (payload) => {
    return {
        type: CHECK_LOGIN,
        payload,
    };
};
export const nextVideoInfo = (payload) => {
    return {
        type: NEXT_VIDEO_INFO,
        payload,
    };
};
export const addSubscriptionList = (payload) => {
    return {
        type: ADD_SUBSCRIPTION_LIST,
        payload,
    };
};
export const addSubscription = (payload) => {
    return {
        type: ADD_SUBSCRIPTION,
        payload,
    };
};
export const deleteSubscription = (payload) => {
    return {
        type: DELETE_SUBSCRIPTION,
        payload,
    };
};
export const _ = (payload) => {
    return {
        type: OPEN_PICTURE_IN_PICTURE,
        payload,
    };
};
export const closePictureInPicture = (payload) => {
    return {
        type: CLOSE_PICTURE_IN_PICTURE,
        payload,
    };
};
