// Core
import { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// Actions, Selectors


// Other
import { toastOptions } from '../constants/toastOptions';
import { useAppDispatch } from '../lib/redux/init/store';
import { getErrorMessage } from '../lib/redux/selectors/auth';
import { signUpActions } from '../lib/redux/actions/signUpAction';

export const useErrorMessage = () => {
    const errorMessage = useSelector(getErrorMessage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage, toastOptions);
            dispatch(signUpActions.resetError());
        }
    }, [errorMessage]);
};
