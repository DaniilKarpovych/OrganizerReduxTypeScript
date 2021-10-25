import { api } from '../../../api';
import { AppDispatch } from '../init/store';
import { signUpActions } from './signUpAction';

export type ILogin = {
    email:string;
    password:string;
};

export const loginActions = Object.freeze({


    loginAsync: (credentials: ILogin) => async (dispatch: AppDispatch) => {
        const { email, password } = credentials;
        const response = await api.getLogin({
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
