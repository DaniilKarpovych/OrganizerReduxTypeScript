// Core
import { useEffect } from 'react';


// Other

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../lib/redux/init/store';
import { getLoginCred, getToken } from '../lib/redux/selectors/auth';
import { loginActions } from '../lib/redux/actions/loginAction';

export const useLogin = () => {
    const token = useSelector(getToken);
    const navigate = useNavigate();
    const credential = useSelector(getLoginCred);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loginActions.loginAsync(credential));
        if (token) {
            navigate('/todo/task-manager');
        }
    }, [credential]);
};
