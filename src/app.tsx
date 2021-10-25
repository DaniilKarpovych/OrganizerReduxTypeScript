// Core
import { FC } from 'react';
import {
    Navigate, Route, Routes, Outlet,
} from 'react-router-dom';
import { Footer } from './components/Footer';
import { LoginForm } from './components/LoginForm/LoginForm';
import { Nav } from './components/Nav';
import { SignUpForm } from './components/SingUpForm/SignUpForm';
// eslint-disable-next-line import/namespace
import { TaskManagerForm } from './components/TaskManagerForm';

// Components

// Instruments

export const App: FC = () => {
    return (
        <>
            <Nav />
            <main>
                { /* <ToastContainer newestOnTop transition = { Slide } /> */ }

                <Routes>
                    <Route path = '/todo' element = { <Outlet /> }>
                        <Route path = '/login' element = { <LoginForm /> } />
                        <Route path = '/signup' element = { <SignUpForm /> } />
                        <Route
                            path = '/task-manager'
                            element = { <TaskManagerForm /> } />
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
