// Core
// import axios from 'axios';

import axios, { AxiosResponse } from 'axios';
import { ILogin } from '../lib/redux/actions/loginAction';
import { ITagType } from '../types/ITagType';

export const TODO_API_URL = 'https://lab.lectrum.io/rtx/api/v2/todos';

type Responce = {
    data: string,
    'statusCode'?: number,
    'message'?: string,
    'error'?: string,
};
type Registration = {
    name: string;
    email: string;
    password: string
};

export const api = Object.freeze({
    async getTags():Promise<ITagType[]> {
        const { data } = await axios.get<ITagType[]>(`${TODO_API_URL}/tags`);

        return data;
    },

    async getSignUp(credential:Registration):Promise<Responce> {
        const { data } = await axios.post<Registration, AxiosResponse<Responce>>(`${TODO_API_URL}/auth/registration`, credential);

        return data;
    },

    async getLogin(credential:ILogin):Promise<Responce> {
        const { email, password } = credential;
        const { data } = await axios.get<Registration, AxiosResponse<Responce>>(`${TODO_API_URL}/auth/login`, {
            headers: {
                Authorization: `Basic ${window.btoa(`${email}:${password}`)}`,
            },
        });

        return data;
    },
});
