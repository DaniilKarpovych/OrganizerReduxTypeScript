import React, { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { settingActions } from '../../lib/redux/actions/newTaskForm';
import { useAppDispatch } from '../../lib/redux/init/store';
import { getNewTaskForm } from '../../lib/redux/selectors/newTaskForm';
import { getTaskState } from '../../lib/redux/selectors/stateManager';
import { Task } from './Task';
import { selectedTaskActions } from '../../lib/redux/actions/selectTaskAction';
import { TaskCard } from './TaskCard';
import { getToken } from '../../lib/redux/selectors/auth';
import { useTags } from '../../hooks/useTags';
import { useEditTask } from '../../hooks/useEditTask';
import { useDeleteTask } from '../../hooks/useDeleteTask';
import { useTaskStateLoad } from '../../hooks/useTaskState';
import { useNewTask } from '../../hooks/useNewTask';

export const TaskManagerForm:React.FC = () => {
    const token = useSelector(getToken);
    const localToken = localStorage.getItem('token');
    if (!token && !localToken) {
        return null;
    }
    useTags();
    useEditTask();
    useDeleteTask();
    useTaskStateLoad();
    useNewTask();
    const newTaskForm = useSelector(getNewTaskForm);
    const state = useSelector(getTaskState);
    const dispatch = useAppDispatch();
    const handlerOnClick = (event: SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(selectedTaskActions.selectTaskID(''));
        dispatch(settingActions.setSettingsOpen(true));
    };
    const taskJSX = state.length > 0 && state.map((task) => {
        return <Task
            { ...task }
            key = { task.id }   />;
    });

    return (
        <>
            <div className = 'controls'>
                <i className = 'las'></i>
                <button className = 'button-create-task' onClick = { handlerOnClick }>
                    Новая задача
                </button>
            </div>
            <div className = 'wrap'>
                <div className = { `list ${state.length > 0 ? '' : 'empty'}` }>
                    <div className = 'tasks'>
                        { state.length > 0 && taskJSX }
                    </div>
                </div>
                { newTaskForm && <TaskCard /> }
            </div>
        </>
    );
};
