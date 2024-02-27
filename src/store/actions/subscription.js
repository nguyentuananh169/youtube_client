import { ADD_SUBSCRIPTION_LIST, ADD_SUBSCRIPTION, DELETE_SUBSCRIPTION } from '../constants';

export const addSubscriptionList = (payload) => {
    return {
        type: ADD_SUBSCRIPTION_LIST,
        payload,
    };
};
export const addSubscription = (payload) => {
    return {
        type: ADD_SUBSCRIPTION,
        payload,
    };
};
export const deleteSubscription = (payload) => {
    return {
        type: DELETE_SUBSCRIPTION,
        payload,
    };
};
