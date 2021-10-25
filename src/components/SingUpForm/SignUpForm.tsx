import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './config';
import { useAppDispatch } from '../../lib/redux/init/store';
import { IRegistration, signUpActions } from '../../lib/redux/actions/signUpAction';

export const SignUpForm = () => {
    const dispatch = useAppDispatch();
    const form = useForm<IRegistration>({
        mode:     'onTouched',
        resolver: yupResolver(schema),
    });
    const onSubmit = form.handleSubmit((credentials:IRegistration) => {
        dispatch(signUpActions.signUpAsync(credentials));
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
