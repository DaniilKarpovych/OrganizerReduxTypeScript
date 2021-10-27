// Core
import { useEffect } from 'react';
// Other
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../lib/redux/init/store';
import { taskStateActions } from '../lib/redux/actions/taskManager';
import {  getTaskEdit } from '../lib/redux/selectors/stateManager';

export const useEditTask = () => {
    const edit = useSelector(getTaskEdit);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(taskStateActions.taskEditAsync(edit));
    }, [edit]);
};
