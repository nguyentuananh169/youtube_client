import { ADD_TOAST_MESSAGE, REMOVE_TOAST_MESSAGE } from '../constants';

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
