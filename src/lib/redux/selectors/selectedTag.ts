import { RootState } from '../init/store';


export const getSelectedTag = (state: RootState) => {
    return state.tagStore.tagSelected;
};
