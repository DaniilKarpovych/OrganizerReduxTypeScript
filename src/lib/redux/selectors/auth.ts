import { ILogin } from '../actions/loginAction';
import { IRegistration } from '../actions/signUpAction';
import { RootState } from '../init/store';


export const getSignUpCred = (state: RootState): IRegistration => {
    return state.authToken.signCredential;
};
export const getLoginCred = (state: RootState): ILogin => {
    return state.authToken.loginCredential;
};
export const getErrorMessage = (state: RootState): string => {
    return state.authToken.errorMessage;
};
export const getError = (state: RootState): string => {
    return state.authToken.error;
};
export const getToken = (state: RootState): string => {
    return state.authToken.token;
};
