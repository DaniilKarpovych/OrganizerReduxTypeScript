// Types
import { AnyAction } from 'redux';
import { selectedTaskTypes } from '../types/selectedTask';

const initialState = {
    selectedTaskID: '',
};

export const selectedTaskReduser = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case selectedTaskTypes.SELECT_TASK: {
            return {
                ...state,
                selectedTaskID: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
