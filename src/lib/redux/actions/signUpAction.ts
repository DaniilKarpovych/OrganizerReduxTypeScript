import { api } from '../../../api';
import { AppDispatch } from '../init/store';
import { authTypes } from '../types/authTypes';

export type IRegistration = {
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
};

export const signUpActions = Object.freeze({

    setToken: (newToken:string) => {
        return {
            type:    authTypes.ADD_TOKEN,
            payload: newToken,
        };
    },

    signUpAsync: (
        credentials: IRegistration & { confirmPassword: string },
    ) => async (dispatch: AppDispatch) => {
        const {
            name,
            email,
            password,
        } = credentials;
        const response = await api.getSignUp({
            name,
            email,
            password,
        });

        if (response.statusCode === 201) {
            const { data: token } = await response;

            localStorage.setItem('token', token);
            dispatch(signUpActions.setToken(token));
            // dispatch(uiActions.notification({
            //     type:    ToastTypes.SUCCESS,
            //     message: `Добро пожаловать, ${credentials.name}`,
            // }));
        } else {
            // const error = await response.json();
            // dispatch(authActions.setFetchingError(error.message));
            // dispatch(uiActions.notification({
            //     type:    ToastTypes.ERROR,
            //     message: error.message,
            // }));
        }
    },
});
