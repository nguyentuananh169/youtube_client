import { CHANGE_USER_IFO, CHECK_LOGIN } from '../constants';

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
