// Types
import { AnyAction } from 'redux';
import { ITaskType } from '../../../types/ITaskType';
import { stateManagerTypes } from '../types/stateManager';

const initialState:{ items:ITaskType[] } = {
    items: [],
};


export const taskManagerReduser = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case stateManagerTypes.ADD_NEW_TASK: {
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        }
        case stateManagerTypes.DELETE_ITEM: {
            return {
                ...state,
                items: state.items.filter((item, index) => {
                    return index !== action.payload;
                }),
            };
        }
        case stateManagerTypes.EDIT_ITEMS: {
            return {
                ...state,
                items: state.items.map((item, index) => {
                    if (index !== action.payload.selectedTask) return item;

                    return action.payload;
                }),
            };
        }
        default: {
            return state;
        }
    }
};
