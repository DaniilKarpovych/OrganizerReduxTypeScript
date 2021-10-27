import { useSelector } from 'react-redux';
import { formatDate } from '../../helpers/formatDate';
import { settingActions } from '../../lib/redux/actions/newTaskForm';
import { selectedTaskActions } from '../../lib/redux/actions/selectTaskAction';
import { useAppDispatch } from '../../lib/redux/init/store';
import { getTagState } from '../../lib/redux/selectors/tagStore';
import { ITaskType } from '../../types/ITaskType';


export const Task:React.FC<ITaskType> = ({
    title, deadline, tag, completed, id,
}) => {
    const tagStore = useSelector(getTagState);
    const dispatch = useAppDispatch();
    const selectedTag = tagStore[ tagStore.findIndex((item) => item.id === tag.id) ];

    const onClick = () => {
        dispatch(selectedTaskActions.selectTaskID(id));
        dispatch(settingActions.setSettingsOpen(true));
    };

    return (
        <div
            className = { `task ${completed ? 'completed' : ''}` }
            onClick = { onClick } >
            <span className = 'title'>{ title }</span>
            <div className = 'meta'>
                <span className = 'deadline'>{ formatDate(deadline) }</span>
                <span
                    className = 'tag'
                    style = { {
                        color:           selectedTag?.color,
                        backgroundColor: selectedTag?.bg,
                    } }>
                    { selectedTag?.name }
                </span>
            </div>
        </div>
    );
};

