// Types

import { toast } from 'react-toastify';
import { api } from '../../../api';
import { formTaskType } from '../../../components/Task/TaskCard';
import { toastOptions } from '../../../constants/toastOptions';
import { ITaskType } from '../../../types/ITaskType';
import { AppDispatch, AppThunk } from '../init/store';
import { getToken } from '../selectors/auth';
import { getSelectedTaskID } from '../selectors/selectedTask';
import { getTask } from '../selectors/stateManager';
import { stateManagerTypes } from '../types/stateManager';
import { settingActions } from './newTaskForm';
import { selectedTaskActions } from './selectTaskAction';
import { signUpActions } from './signUpAction';


export const taskStateActions = Object.freeze({
    setNewState: (newTask: formTaskType) => {
        return {
            type:    stateManagerTypes.ADD_NEW_TASK,
            payload: newTask,
        };
    },
    setLoadStat: (itemsState: ITaskType[]) => {
        return {
            type:    stateManagerTypes.LOAD_STATE,
            payload: itemsState,
        };
    },
    deleteItem: (deleteItem: boolean) => {
        return {
            type:    stateManagerTypes.DELETE_ITEM,
            payload: deleteItem,
        };
    },
    editItem: (editTask: boolean) => {
        return {
            type:    stateManagerTypes.EDIT_ITEMS,
            payload: editTask,
        };
    },
    postItem: (postTask:boolean) => {
        return {
            type:    stateManagerTypes.POST_NEW_TASK,
            payload: postTask,
        };
    },

    taskAsync: (taskPost:boolean):
    AppThunk => async (dispatch: AppDispatch, getState) => {
        const token = getToken(getState()) || localStorage.getItem('token');
        const newTask = getTask(getState());
        if (!taskPost) {
            return null;
        }
        try {
            await api.postTask(newTask, token);
            toast.success('Добавленно задание ', toastOptions);
            dispatch(taskStateActions.postItem(false));
        } catch (error) {
            const { message } = error as Error;
            dispatch(signUpActions.setErrorMessage(message));
        }
    },
    taskStateAsync: (token: string | null):
    AppThunk => async (dispatch: AppDispatch) => {
        if (!token) {
            return null;
        }

        try {
            const response = await api.getTasks(token);
            dispatch(taskStateActions.setLoadStat(response));
        } catch (error) {
            const { message } = error as Error;
            dispatch(signUpActions.setError(true));
            dispatch(signUpActions.setErrorMessage(message));
        }
    },
    taskDeleteAsync: (del:boolean):
    AppThunk => async (dispatch: AppDispatch, getState) => {
        const token = getToken(getState()) || localStorage.getItem('token');
        const id = getSelectedTaskID(getState());

        if (!del) {
            return null;
        }
        try {
            await api.deleteTask(id, token);
            dispatch(taskStateActions.deleteItem(false));
            dispatch(selectedTaskActions.selectTaskID(''));
            dispatch(settingActions.setSettingsOpen(false));
            toast.info(`задача с индификационным номером ${id} удалена`);
        } catch (error) {
            const { message } = error as Error;
            dispatch(signUpActions.setError(true));
            dispatch(signUpActions.setErrorMessage(message));
        }
    },
    taskEditAsync: (edit:boolean):
    AppThunk => async (dispatch: AppDispatch, getState) => {
        const token = getToken(getState()) || localStorage.getItem('token');
        const id = getSelectedTaskID(getState());
        const newTask = getTask(getState());
        if (!edit) {
            return null;
        }
        try {
            await api.EditTask(newTask, id, token);
            dispatch(taskStateActions.editItem(false));
            dispatch(selectedTaskActions.selectTaskID(''));
            dispatch(settingActions.setSettingsOpen(false));
            toast.info(`задача с индификационным номером ${id} успещно обновлена`);
        } catch (error) {
            const { message } = error as Error;
            dispatch(signUpActions.setError(true));
            dispatch(signUpActions.setErrorMessage(message));
        }
    },
});
