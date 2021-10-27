// Core
import { combineReducers } from 'redux';

// Reducers
import { newTaskFormReduser as newTaskForm } from '../reducers/newTask';
import { taskManagerReduser as taskManager } from '../reducers/taskManager';
import { tagReducer as tagStore } from '../reducers/tagReducer';
import { selectedTaskReduser as selectedTask } from '../reducers/selecteTask';
import { authTokenReduser as authToken } from '../reducers/authReducer';

export const rootReducer = combineReducers({
    newTaskForm,
    taskManager,
    tagStore,
    selectedTask,
    authToken,
});
