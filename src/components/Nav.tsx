import { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastOptions } from '../constants/toastOptions';
import { signUpActions } from '../lib/redux/actions/signUpAction';
import { useAppDispatch } from '../lib/redux/init/store';
import { getToken } from '../lib/redux/selectors/auth';

export const Nav: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = useSelector(getToken);
    const localToken = localStorage.getItem('token');
    const auth = !!token || !!localToken;
    const handleClick = (event: SyntheticEvent<HTMLAnchorElement>) => {
        if (!token && !localToken) {
            event.preventDefault();
        }
    };
    const ooClickLogout = () => {
        dispatch(signUpActions.setToken(''));
        localStorage.removeItem('token');
        navigate('/todo/login');
        toast.success('Грустно что вы нас покидаете, приходити еще', toastOptions);
    };

    return (
        <nav>
            { !auth &&  <NavLink
                className = '' to = '/todo/login'
                aria-current = 'page'>
                Войти
            </NavLink> }
            <NavLink
                onClick = { handleClick }
                aria-disabled = { `${!auth}` } className = ''
                to = '/todo/task-manager'>
                К задачам
            </NavLink>
            <NavLink
                onClick = { handleClick }
                aria-disabled = { `${!auth}` } className = ''
                to = '/todo/profile'>
                Профиль
            </NavLink>
            { auth && <button onClick = { ooClickLogout } className = 'button-logout'>Выйти</button> }
        </nav>
    );
};
