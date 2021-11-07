import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { schema } from './config';
import { useAppDispatch } from '../../lib/redux/init/store';
import { IRegistration, signUpActions } from '../../lib/redux/actions/signUpAction';
import { getToken } from '../../lib/redux/selectors/auth';
import { useSignUp } from '../../hooks/useSignUp';

export const SignUpForm = () => {
    useSignUp();
    const token = useSelector(getToken);
    const navigate = useNavigate();
    useEffect(() => {
        if (token || localStorage.getItem('token')) {
            navigate('/todo/task-manager');
        }
    }, []);
    const dispatch = useAppDispatch();
    const form = useForm<IRegistration>({
        mode:     'onTouched',
        resolver: yupResolver(schema),
    });
    const onSubmit = form.handleSubmit((credentials:IRegistration) => {
        dispatch(signUpActions.setSignUpCredential(credentials));
    });

    return (
        <section className = 'publish-tip sign-form'>
            <form onSubmit = { onSubmit }>
                <fieldset>
                    <legend>Регистрация</legend>
                    <label className = 'label'>
                        <span className = 'errorMessage'>{ form.formState.errors.name?.message }</span>
                        <input
                            placeholder = 'Имя и фамилия'
                            type = 'text'
                            { ...form.register('name') } />
                    </label>
                    <label className = 'label'>
                        <span className = 'errorMessage'>{ form.formState.errors.email?.message }</span>
                        <input
                            placeholder = 'Электропочта'
                            type = 'text'
                            { ...form.register('email') } />
                    </label>
                    <label className = 'label'>
                        <span className = 'errorMessage'>{ form.formState.errors.password?.message }</span>
                        <input
                            lang = 'en'
                            placeholder = 'Пароль'
                            type = 'password'
                            { ...form.register('password') } />
                    </label>
                    <label className = 'label'>
                        <span className = 'errorMessage'>{ form.formState.errors.confirmPassword?.message }</span>
                        <input
                            lang = 'en'
                            placeholder = 'Подтверждение пароля'
                            type = 'password'
                            { ...form.register('confirmPassword') } />
                    </label>
                    <input
                        className = 'button-login'
                        type = 'submit'
                        value = 'Зарегистрироваться' />
                </fieldset>
                <p>
                    Перейти к <Link to = '/todo/login'>логину</Link>.
                </p>
            </form>
        </section>
    );
};
