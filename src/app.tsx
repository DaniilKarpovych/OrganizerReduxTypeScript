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
import { useErrorMessage } from './hooks/useErrorMessage';

export const App: FC = () => {
    useErrorMessage();

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
                        <Route
                            path = '/profile'
                            element = { <h1> Профиль пользователя </h1> } />
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
