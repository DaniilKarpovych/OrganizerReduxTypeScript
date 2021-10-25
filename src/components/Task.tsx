import { formatDate } from '../helpers/formatDate';
import { settingActions } from '../lib/redux/actions/newTaskForm';
import { selectedTaskActions } from '../lib/redux/actions/selectTaskAction';
import { useAppDispatch } from '../lib/redux/init/store';
import { ITagType } from '../types/ITagType';


type taskType = {
    completed: boolean;
    id:number;
    title:string;
    deadline:string;
    tag:ITagType;
};

export const Task:React.FC<taskType> = ({
    title, deadline, id, tag, completed,
}) => {
    const dispatch = useAppDispatch();
    const onClick = () => {
        dispatch(selectedTaskActions.selectTask(id));
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
                        color:           tag?.color,
                        backgroundColor: tag?.bg,
                    } }>
                    { tag?.name }
                </span>
            </div>
        </div>
    );
};

