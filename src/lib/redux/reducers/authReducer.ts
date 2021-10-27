// Types
import { AnyAction } from 'redux';
import { authTypes } from '../types/authTypes';


const initialState = {
    token:           '',
    errorMessage:    '',
    error:           false,
    signCredential:  null,
    loginCredential: null,
};

export const authTokenReduser = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case authTypes.ADD_TOKEN: {
            return {
                ...state,
                token: action.payload,
            };
        }
        case authTypes.ADD_CREDENTIAL: {
            return {
                ...state,
                signCredential: action.payload,
            };
        }
        case authTypes.ADD_LOGIN_CREDENTIAL: {
            return {
                ...state,
                loginCredential: action.payload,
            };
        }
        case authTypes.SET_ERROR: {
            return {
                ...state,
                error: action.payload,
            };
        }
        case authTypes.SET_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
