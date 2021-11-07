import { toast } from 'react-toastify';
import { api } from '../../../api';
import { toastOptions } from '../../../constants/toastOptions';
import { AppDispatch, AppThunk } from '../init/store';
import { signUpActions } from './signUpAction';

export type ILogin = {
    email: string;
    password: string;
};

export const loginActions = Object.freeze({


    loginAsync: (credentials: ILogin): AppThunk => async (dispatch: AppDispatch) => {
        if (!credentials) {
            return null;
        }

        const { email, password } = credentials;
        try {
            const response = await api.getLogin({
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
