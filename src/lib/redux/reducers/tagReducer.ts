// Types
import { AnyAction } from 'redux';
import { tagTypes } from '../types/tagTypes';

const initialState = {
    tagStore:    [],
    isFetching:  false,
    tagSelected: {},
};

export const tagReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case tagTypes.START_FETCHING: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case tagTypes.STOP_FETCHING: {
            return {
                ...state,
                isFetching: false,
            };
        }

        case tagTypes.FETCH_TAG: {
            return {
                ...state,
                isFetching: false,
                tagStore:   action?.payload,
            };
        }
        case tagTypes.TAG_SELECTED: {
            return {
                ...state,
                tagSelected: action?.payload,
            };
        }

        default: {
            return state;
        }
    }
};
