import { combineReducers } from 'redux';

import toggleNavbarReducer from './toggleNavbar';
import pictureInPictureReducer from './pictureInPicture';
import hiddenHeaderReducer from './hiddenHeader';
import toastMessageReducer from './toastMessage';
import authReducer from './auth';
import nextVideoInfoReducer from './nextVideoInfo';
import subscriptionReducer from './subscription';

const rootReducer = combineReducers({
    toggleNavbar: toggleNavbarReducer,
    pictureInPicture: pictureInPictureReducer,
    hiddenHeader: hiddenHeaderReducer,
    toastMessage: toastMessageReducer,
    auth: authReducer,
    nextVideoInfo: nextVideoInfoReducer,
    subscription: subscriptionReducer,
});
export default rootReducer;
