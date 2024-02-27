import { IS_TOGGLE_NAVBAR, IS_TOGGLE_NAVBAR2 } from '../constants';

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
