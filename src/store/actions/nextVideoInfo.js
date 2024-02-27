import { NEXT_VIDEO_INFO } from '../constants';

export const nextVideoInfo = (payload) => {
    return {
        type: NEXT_VIDEO_INFO,
        payload,
    };
};
