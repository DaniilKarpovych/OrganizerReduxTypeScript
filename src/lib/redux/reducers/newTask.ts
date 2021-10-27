// Types
import { AnyAction } from 'redux';
import { newTaskTypes } from '../types/newTypes';

const initialState = {
    isNewTaskOpen: false,
};

export const newTaskFormReduser = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case newTaskTypes.OPEN_NEW_TASK: {
            return {
                ...state,
                isNewTaskOpen: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
