// Core
import { FC } from 'react';
import {
    Navigate, Route, Routes, Outlet,
} from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import { Footer } from './components/Footer';
import { LoginForm } from './components/LoginForm/LoginForm';
import { Nav } from './components/Nav';
import { SignUpForm } from './components/SingUpForm/SignUpForm';
import { TaskManagerForm } from './components/Task/TaskManagerForm';
import { useDeleteTask } from './hooks/useDeleteTask';
import { useEditTask } from './hooks/useEditTask';
import { useErrorMessage } from './hooks/useErrorMessage';
import { useLogin } from './hooks/useLogin';
import { useNewTask } from './hooks/useNewTask';
import { useSignUp } from './hooks/useSignUp';
import { useTags } from './hooks/useTags';
import { useTaskStateLoad } from './hooks/useTaskState';

export const App: FC = () => {
    useTags();
    useEditTask();
    useDeleteTask();
    useTaskStateLoad();
    useNewTask();
    useErrorMessage();
    useSignUp();
    useLogin();

    return (
        <>
            <Nav />
            <main>
                <ToastContainer newestOnTop transition = { Slide } />

                <Routes>
                    <Route path = '/todo' element = { <Outlet /> }>
                        <Route path = '/login' element = { <LoginForm /> } />
                        <Route path = '/signup' element = { <SignUpForm /> } />
                        <Route
                            path = '/task-manager'
                            element = { <TaskManagerForm /> } />
                        <Route path = '/profile' element = { <h1> Профиль пользователя </h1> } />
                    </Route>
                    <Route
                        path = '*'
                        element = { <Navigate to = '/todo/login' replace /> } />
                </Routes>
            </main>
            <Footer />
        </>
    );
};
