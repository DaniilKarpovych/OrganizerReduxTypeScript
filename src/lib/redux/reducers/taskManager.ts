// Types
import { AnyAction } from 'redux';
import { stateManagerTypes } from '../types/stateManager';

const initialState = {
    item:        {},
    itemsState:  [],
    itemsDelete: false,
    itemsEdit:   false,
    itemsPost:   false,
};


export const taskManagerReduser = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case stateManagerTypes.ADD_NEW_TASK: {
            return {
                ...state,
                item: action.payload,
            };
        }
        case stateManagerTypes.DELETE_ITEM: {
            return {
                ...state,
                itemsDelete: action.payload,
            };
        }
        case stateManagerTypes.EDIT_ITEMS: {
            return {
                ...state,
                itemsEdit: action.payload,
            };
        }
        case stateManagerTypes.LOAD_STATE: {
            return {
                ...state,
                itemsState: action.payload,
            };
        }
        case stateManagerTypes.POST_NEW_TASK: {
            return {
                ...state,
                itemsPost: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
