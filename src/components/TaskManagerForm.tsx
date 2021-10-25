import React, { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { settingActions } from '../lib/redux/actions/newTaskForm';
import { useAppDispatch } from '../lib/redux/init/store';
import { getNewTask } from '../lib/redux/selectors/newTask';
import { getTaskState } from '../lib/redux/selectors/stateManager';
import { TaskCard } from './TaskCard';
import { Task } from './Task';
import { selectedTaskActions } from '../lib/redux/actions/selectTaskAction';

export const TaskManagerForm:React.FC = () => {
    const newTask = useSelector(getNewTask);
    const state = useSelector(getTaskState);
    const dispatch = useAppDispatch();
    const handlerOnClick = (event: SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(selectedTaskActions.selectTask(null));
        dispatch(settingActions.setSettingsOpen(true));
    };
    const taskJSX = state.length > 0 && state.map((task, id:number) => {
        return <Task
            id = { id }
            { ...task }
            key = { id }   />;
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
                { newTask && <TaskCard /> }
            </div>
        </>
    );
};
