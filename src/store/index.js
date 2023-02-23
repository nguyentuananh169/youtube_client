import { createStore } from 'redux';
const initState = {
    isHideNavbar: false,
};
function navbarReducer(initState, action) {
    switch (action.type) {
        case 'f':
            return initState;
        default:
            return initState;
    }
}
let store = createStore(navbarReducer);

export default store;
