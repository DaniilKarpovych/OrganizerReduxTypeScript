// Core
import { useEffect } from 'react';


// Other

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../lib/redux/init/store';
import { getToken } from '../lib/redux/selectors/auth';
import { taskStateActions } from '../lib/redux/actions/taskManager';
import { getTaskDelete, getTaskEdit, getTaskPost } from '../lib/redux/selectors/stateManager';

export const useTaskStateLoad = () => {
    const dispatch = useAppDispatch();
    const token = useSelector(getToken) || localStorage.getItem('token');
    const del = useSelector(getTaskDelete);
    const edit = useSelector(getTaskEdit);
    const post = useSelector(getTaskPost);
    useEffect(() => {
        dispatch(taskStateActions.taskStateAsync(token));
    }, [token, del, edit, post]);
};
