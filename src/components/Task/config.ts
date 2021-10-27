// Core
import * as yup from 'yup';
import { formTaskType } from './TaskCard';

// eslint-disable-next-line no-template-curly-in-string
const tooLongMessage = 'максимальная длина — ${max} символов';

export const schema:yup.SchemaOf<formTaskType> = yup.object().shape({
    completed: yup
        .boolean()
        .required('*'),
    title: yup
        .string()
        .min(3, 'Минимальная длина поля title — 3')
        .max(140, tooLongMessage)
        .required('*'),
    deadline: yup
        .string()
        .required('*'),
    description: yup
        .string()
        .min(3, 'Минимальная длина поля descriptions — 3')
        .max(140, tooLongMessage)
        .required('*'),
    tag: yup
        .string()
        .required('*'),
});

