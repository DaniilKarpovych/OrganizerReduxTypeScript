import { ITagType } from '../../../types/ITagType';
import { RootState } from '../init/store';


export const getTagState = (state: RootState): ITagType[] => {
    return state.tagStore.tagStore;
};
