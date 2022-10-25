import * as actions from './actionTypes';

export const updateStories = stories => ({
    type: actions.STORIES_UPDATE,
    payload: stories
});


