import { RootState } from '../init/store';


export const getNewTask = (state: RootState): boolean => {
    return state.newTask.isNewTaskOpen;
};
