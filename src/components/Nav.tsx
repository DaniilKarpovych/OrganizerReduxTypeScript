// import { SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line no-lone-blocks
{
    /* <nav>
    <a aria-disabled="false" class="active" href="/todo/task-manager" aria-current="page">К задачам</a>
    <a aria-disabled="false" class="" href="/todo/profile">Профиль</a>
    <button class="button-logout">Выйти</button>
    </nav> */
}

export const Nav: React.FC = () => {
    // const handleClick = (event: SyntheticEvent<HTMLAnchorElement>) => {
    //     if (false) event.preventDefault();
    // };

    return (
        <nav>
            <NavLink
                className = '' to = '/todo/login'
                aria-current = 'page'>
                Войти
            </NavLink>
            <NavLink
                aria-disabled = 'true' className = ''
                to = '/todo/task-manager'>
                К задачам
            </NavLink>
            <NavLink
                aria-disabled = 'true' className = ''
                to = '/todo/profile'>
                Профиль
            </NavLink>
        </nav>
    );
};
