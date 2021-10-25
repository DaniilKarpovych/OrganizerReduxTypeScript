import { RootState } from '../init/store';


export const getSelectedTask = (state: RootState):number => {
    return state.selectedTask.selectedTask;
};
