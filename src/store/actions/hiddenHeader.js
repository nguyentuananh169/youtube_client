import { IS_HIDDEN_HEADER } from '../constants';

export const setIsHiddenHeader = (payload) => {
    return {
        type: IS_HIDDEN_HEADER,
        payload,
    };
};
