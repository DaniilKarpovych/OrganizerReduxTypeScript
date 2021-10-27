import { api } from '../../../api';
import { ITagType } from '../../../types/ITagType';
import { Action, AppThunk } from '../init/store';
import { tagTypes } from '../types/tagTypes';
import { signUpActions } from './signUpAction';

export const tagActions = Object.freeze({
    startFetching: () => {
        return {
            type: tagTypes.START_FETCHING,
        };
    },

    stopFetching: () => {
        return {
            type: tagTypes.STOP_FETCHING,
        };
    },

    fetchTag: (tags: ITagType[]): Action => {
        return {
            type:    tagTypes.FETCH_TAG,
            payload: tags,
        };
    },
    selectTag: (selectedTag:ITagType) => {
        return {
            type:    tagTypes.TAG_SELECTED,
            payload: selectedTag,
        };
    },

    fetchTagAsync: (): AppThunk => async (dispatch) => {
        try {
            const tags = await api.getTags();
            dispatch(tagActions.fetchTag(tags));
        } catch (error) {
            const { message } = error as Error;
            dispatch(signUpActions.setErrorMessage(message));
        }
    },
});
