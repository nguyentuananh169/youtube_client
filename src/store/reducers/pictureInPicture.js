import { OPEN_PICTURE_IN_PICTURE, CLOSE_PICTURE_IN_PICTURE } from '../constants';
const initialState = {
    isOpen: false,
    videoData: {},
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_PICTURE_IN_PICTURE:
            return { ...state, isOpen: true, videoData: action.payload };
        case CLOSE_PICTURE_IN_PICTURE:
            return { ...state, isOpen: false, videoData: {} };
        default:
            return state;
    }
};
export default reducer;
