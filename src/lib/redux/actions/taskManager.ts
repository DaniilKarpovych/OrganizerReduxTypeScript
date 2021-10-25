// Types

import { ITagType } from '../../../types/ITagType';
import { ITaskType } from '../../../types/ITaskType';
import { stateManagerTypes } from '../types/stateManager';

type editType = {
    selectedTask:number;
    completed:boolean;
    title:string;
    deadline:string;
    description:string;
    tag:ITagType;
};

export const taskStateActions = Object.freeze({
    setNewState: (newTask: ITaskType) => {
        return {
            type:    stateManagerTypes.ADD_NEW_TASK,
            payload: newTask,
        };
    },
    deleteItem: (index: number) => {
        return {
            type:    stateManagerTypes.DELETE_ITEM,
            payload: index,
        };
    },
    editItem: (editTask: editType) => {
        return {
            type:    stateManagerTypes.EDIT_ITEMS,
            payload: editTask,
        };
    },

});
