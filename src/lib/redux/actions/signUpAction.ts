import { toast } from 'react-toastify';
import { api } from '../../../api';
import { toastOptions } from '../../../constants/toastOptions';
import { AppDispatch, AppThunk } from '../init/store';
import { authTypes } from '../types/authTypes';
import { ILogin } from './loginAction';

export type IRegistration = {
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
};

export const signUpActions = Object.freeze({
    resetError: () => {
        return {
            type: authTypes.RESET_ERROR,
        };
    },
    setToken: (newToken:string) => {
        return {
            type:    authTypes.ADD_TOKEN,
            payload: newToken,
        };
    },
    setSignUpCredential: (credential:IRegistration) => {
        return {
            type:    authTypes.ADD_CREDENTIAL,
            payload: credential,
        };
    },
    setLoginCredential: (credential:ILogin) => {
        return {
            type:    authTypes.ADD_LOGIN_CREDENTIAL,
            payload: credential,
        };
    },
    setErrorMessage: (errorMessage:string) => {
        return {
            type:    authTypes.ADD_CREDENTIAL,
            payload: errorMessage,
        };
    },
    setError: (error:boolean) => {
        return {
            type:    authTypes.ADD_CREDENTIAL,
            payload: error,
        };
    },

    signUpAsync: (
        credentials: IRegistration,
    ):AppThunk => async (dispatch: AppDispatch)  => {
        if (!credentials) {
            return null;
        }
        const {
            name,
            email,
            password,
        } = credentials;
        try {
            const response = await api.getSignUp({
                name,
                email,
                password,
            });

            const { data: token } = await response;
            localStorage.setItem('token', token);
            dispatch(signUpActions.setToken(token));
            toast.success('Добро пожаловать ', toastOptions);
        } catch (error) {
            const { message } = error as Error;
            dispatch(signUpActions.setErrorMessage(message));
            dispatch(signUpActions.setError(true));
        }
    },
});
