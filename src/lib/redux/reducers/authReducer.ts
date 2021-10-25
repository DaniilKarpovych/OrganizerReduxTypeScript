// Types
import { AnyAction } from 'redux';
import { authTypes } from '../types/authTypes';


const initialState = {
    token: '',
};

export const newTaskReduser = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case authTypes.ADD_TOKEN: {
            return {
                ...state,
                token: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
