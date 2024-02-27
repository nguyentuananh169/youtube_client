import { IS_TOGGLE_NAVBAR, IS_TOGGLE_NAVBAR2 } from '../constants';
const initialState = {
    isToggleNavbar: false,
    isToggleNavbar2: false,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_TOGGLE_NAVBAR:
            if (action.payload === undefined || action.payload === null) {
                return { ...state, isToggleNavbar: !state.isToggleNavbar };
            }
            return { ...state, isToggleNavbar: action.payload };
        case IS_TOGGLE_NAVBAR2:
            if (action.payload === undefined || action.payload === null) {
                return { ...state, isToggleNavbar2: !state.isToggleNavbar2 };
            }
            return { ...state, isToggleNavbar2: action.payload };
        default:
            return state;
    }
};
export default reducer;
