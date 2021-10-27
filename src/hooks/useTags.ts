// Core
import { useEffect } from 'react';


// Other

import { useAppDispatch } from '../lib/redux/init/store';
import { tagActions } from '../lib/redux/actions/tagAction';

export const useTags = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(tagActions.fetchTagAsync());
    }, []);
};
