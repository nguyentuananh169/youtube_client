import { NEXT_VIDEO_INFO } from '../constants';
const initialState = {};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case NEXT_VIDEO_INFO:
            return action.payload;
        default:
            return state;
    }
};
export default reducer;
