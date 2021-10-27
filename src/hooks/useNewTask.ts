// Core
import { useEffect } from 'react';
// Other
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../lib/redux/init/store';
import {  getTaskPost } from '../lib/redux/selectors/stateManager';
import { taskStateActions } from '../lib/redux/actions/taskManager';

export const useNewTask = () => {
    const taskPost = useSelector(getTaskPost);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(taskStateActions.taskAsync(taskPost));
    }, [taskPost]);
};
