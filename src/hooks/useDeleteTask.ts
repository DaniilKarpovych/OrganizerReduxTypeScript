// Core
import { useEffect } from 'react';
// Other
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../lib/redux/init/store';
import { taskStateActions } from '../lib/redux/actions/taskManager';
import { getTaskDelete } from '../lib/redux/selectors/stateManager';

export const useDeleteTask = () => {
    const del = useSelector(getTaskDelete);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(taskStateActions.taskDeleteAsync(del));
    }, [del]);
};
