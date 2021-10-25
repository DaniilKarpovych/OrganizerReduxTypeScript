// Core
import * as yup from 'yup';

// eslint-disable-next-line no-template-curly-in-string
const tooShortMessage = 'минимальная длина — ${min} символов';
// eslint-disable-next-line no-template-curly-in-string
const tooLongMessage = 'максимальная длина — ${max} символов';

export const schema:yup.SchemaOf<ISignUpFormShape> = yup.object().shape({
    name: yup
        .string()
        .min(2, tooShortMessage)
        .max(40, tooLongMessage)
        .required('*'),
    email: yup
        .string()
        .email('почта должна быть настоящей')
        .required('Поле email обязательно для заполнения'),
    password: yup
        .string()
        .min(8, tooShortMessage)
        .max(16, tooLongMessage)
        .required('*'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Пароли должны совпадать')
        .required('Поле confirmPassword обязательно для заполнения'),
});
export interface ISignUpFormShape {
    name: string;
    email:string;
    password: string;
    confirmPassword?: string;
}
