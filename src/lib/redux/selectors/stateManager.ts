import { ITaskType } from '../../../types/ITaskType';
import { RootState } from '../init/store';


export const getTaskState = (state: RootState): ITaskType[] => {
    return state.taskManager.items;
};
