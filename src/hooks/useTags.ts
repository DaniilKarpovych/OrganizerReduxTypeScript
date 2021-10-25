// Core
import { useEffect } from 'react';


// Other

import { useAppDispatch } from '../lib/redux/init/store';
import { tagActions } from '../lib/redux/actions/tagAction';

export const useProfile = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(tagActions.fetchTagAsync());
    }, []);
};
