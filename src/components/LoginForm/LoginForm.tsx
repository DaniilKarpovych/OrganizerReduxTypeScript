import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { loginActions } from '../../lib/redux/actions/loginAction';
import { IRegistration } from '../../lib/redux/actions/signUpAction';
import { useAppDispatch } from '../../lib/redux/init/store';
import { schema } from './config';

export const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const form = useForm<IRegistration>({
        mode:     'onTouched',
        resolver: yupResolver(schema),
    });

    const onSubmit = form.handleSubmit((credential) => {
        dispatch(loginActions.loginAsync(credential));
        form.reset();
    });

    return (
        <section className = 'sign-form'>
            <form onSubmit = { onSubmit }>
                <fieldset>
                    <legend>Вход</legend>
                    <label className = 'label'>
                        <span className = 'errorMessage'>{ form.formState.errors?.email?.message }</span>
                        <input
                            placeholder = 'Электропочта'
                            type = 'text'
                            { ...form.register('email') } />
                    </label>
                    <label className = 'label'>
                        <span className = 'errorMessage'>{ form.formState.errors?.password?.message }</span>
                        <input
                            lang = 'en'
                            placeholder = 'Пароль'
                            type = 'password'
                            { ...form.register('password') } />
                    </label>
                    <input
                        className = 'button-login'
                        type = 'submit'
                        value = 'Войти' />
                </fieldset>
                <p>
                        Если у вас до сих пор нет учётной записи, вы можете{ ' ' }
                    <Link  to = '/todo/signup'>зарегистрироваться</Link>.
                </p>
            </form>
        </section>
    );
};
