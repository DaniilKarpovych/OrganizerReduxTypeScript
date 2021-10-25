// Types
import { AnyAction } from 'redux';
import { selectedTaskTypes } from '../types/selectedTask';

const initialState = {
    selectedTask: null,
};

export const selectedTaskReduser = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case selectedTaskTypes.SELECT_TASK: {
            return {
                ...state,
                selectedTask: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
