import { RootState } from '../init/store';


export const getNewTaskForm = (state: RootState): boolean => {
    return state.newTaskForm.isNewTaskOpen;
};
