
import { formTaskType } from '../../../components/Task/TaskCard';
import { ITaskType } from '../../../types/ITaskType';
import { RootState } from '../init/store';


export const getTaskState = (state: RootState): ITaskType[] => {
    return state.taskManager.itemsState;
};
export const getTask = (state: RootState): formTaskType => {
    return state.taskManager.item;
};
export const getTaskEdit = (state: RootState): boolean => {
    return state.taskManager.itemsEdit;
};
export const getTaskDelete = (state: RootState): boolean => {
    return state.taskManager.itemsDelete;
};
export const getTaskPost = (state: RootState): boolean => {
    return state.taskManager.itemsPost;
};
