// Types
import { selectedTaskTypes } from '../types/selectedTask';


export const selectedTaskActions = Object.freeze({
    selectTaskID: (selectedTaskID: string) => {
        return {
            type:    selectedTaskTypes.SELECT_TASK,
            payload: selectedTaskID,
        };
    },
});
