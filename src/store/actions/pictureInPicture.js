import { OPEN_PICTURE_IN_PICTURE, CLOSE_PICTURE_IN_PICTURE } from '../constants';

export const openPictureInPicture = (payload) => {
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
