// Types

import { newTaskTypes } from '../types/newTypes';


export const settingActions = Object.freeze({
    setSettingsOpen: (isSettingsOpen: boolean) => {
        return {
            type:    newTaskTypes.OPEN_NEW_TASK,
            payload: isSettingsOpen,
        };
    },

});
