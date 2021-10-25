// Core
import { combineReducers } from 'redux';

// Reducers
import { newTaskReduser as newTask } from '../reducers/newTask';
import { taskManagerReduser as taskManager } from '../reducers/taskManager';
import { tagReducer as tagStore } from '../reducers/tagReducer';
import { selectedTaskReduser as selectedTask } from '../reducers/selecteTask';

export const rootReducer = combineReducers({
    newTask,
    taskManager,
    tagStore,
    selectedTask,
    // tmp: () => ({}),
});
