import * as actions from './actionTypes';

export default function reducer(state = [], action) {
    switch (action.type) {
        case actions.STORIES_UPDATE:
            return action.payload;
        default:
            return state;
    }
}