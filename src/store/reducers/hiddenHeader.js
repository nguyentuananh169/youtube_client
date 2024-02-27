import { IS_HIDDEN_HEADER } from '../constants';
const initialState = {
    isHiddenHeader: false,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_HIDDEN_HEADER:
            if (action.payload === undefined || action.payload === null) {
                return { ...state, isHiddenHeader: !state.isHiddenHeader };
            }
            return { ...state, isHiddenHeader: action.payload };

        default:
            return state;
    }
};
export default reducer;
