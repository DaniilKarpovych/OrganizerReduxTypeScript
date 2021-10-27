import { RootState } from '../init/store';


export const getSelectedTaskID = (state: RootState):string => {
    return state.selectedTask.selectedTaskID;
};
