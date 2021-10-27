// Core
import { useEffect } from 'react';


// Other

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../lib/redux/init/store';
import {  signUpActions } from '../lib/redux/actions/signUpAction';
import { getSignUpCred, getToken } from '../lib/redux/selectors/auth';

export const useSignUp = () => {
    const token = useSelector(getToken);
    const navigate = useNavigate();
    const credential = useSelector(getSignUpCred);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(signUpActions.signUpAsync(credential));
        if (token) {
            navigate('/todo/task-manager');
        }
    }, [credential, token]);
};
