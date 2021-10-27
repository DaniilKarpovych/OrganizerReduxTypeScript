// Core
// import axios from 'axios';

import axios, { AxiosResponse } from 'axios';
import { formTaskType } from '../components/Task/TaskCard';
import { ILogin } from '../lib/redux/actions/loginAction';
import { ITagType } from '../types/ITagType';
import { ITaskType } from '../types/ITaskType';

export const TODO_API_URL = 'https://lab.lectrum.io/rtx/api/v2/todos';

type Responce = {
    data:string
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

    async getTasks(token:string):Promise<ITaskType[]> {
        const { data } = await axios.get<{ token:string }, AxiosResponse<{ data:ITaskType[] }>>(`${TODO_API_URL}/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data?.data;
    },

    async getSignUp(credential:Registration):Promise<Responce> {
        const data  = await axios.post<Registration, AxiosResponse<Responce>>(`${TODO_API_URL}/auth/registration`, credential);

        return data.data;
    },

    async getLogin(credential:ILogin):Promise<Responce> {
        const { email, password } = credential;
        const  { data }  = await axios.get<Registration, AxiosResponse<Responce>>(`${TODO_API_URL}/auth/login`, {
            headers: {
                Authorization: `Basic ${window.btoa(`${email}:${password}`)}`,
            },
        });

        return data;
    },
    async postTask(newTask:formTaskType, token:string | null):Promise<ITaskType> {
        const { data } = await axios.post<formTaskType, AxiosResponse<ITaskType>>(`${TODO_API_URL}/tasks`,
            newTask, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        return data;
    },
    async deleteTask(id:string, token:string | null) {
        const { data } = await axios.delete(`${TODO_API_URL}/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    },
    async EditTask(updateTask:formTaskType, id:string, token:string | null) {
        const { data } = await axios.put(`${TODO_API_URL}/tasks/${id}`, updateTask, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    },
});
