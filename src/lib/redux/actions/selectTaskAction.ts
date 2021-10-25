// Types
import { selectedTaskTypes } from '../types/selectedTask';


export const selectedTaskActions = Object.freeze({
    selectTask: (selectedTask: number | null) => {
        return {
            type:    selectedTaskTypes.SELECT_TASK,
            payload: selectedTask,
        };
    },
});
