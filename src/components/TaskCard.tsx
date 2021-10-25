import { SyntheticEvent, useEffect } from 'react';
import ReactDatePicker, { registerLocale }  from 'react-datepicker';
import { useForm } from 'react-hook-form';
import  ru  from 'date-fns/locale/ru';
import { useSelector } from 'react-redux';
import { settingActions } from '../lib/redux/actions/newTaskForm';
import { taskStateActions } from '../lib/redux/actions/taskManager';
import { useAppDispatch } from '../lib/redux/init/store';
import { getTaskState } from '../lib/redux/selectors/stateManager';
import { getSelectedTask } from '../lib/redux/selectors/selectedTask';
import { selectedTaskActions } from '../lib/redux/actions/selectTaskAction';
import { ITagType } from '../types/ITagType';
import { Tag } from './Tag';

type formType = {
    completed:boolean;
    title:string;
    deadline:string;
    description:string;
    tag:ITagType;
};

export const TaskCard = () => {
    const dispatch = useAppDispatch();
    const state = useSelector(getTaskState);
    const selectedTask = useSelector(getSelectedTask);
    const form = useForm<formType>({
        mode:          'onTouched',
        // resolver: yupResolver(schema),
        defaultValues: {
            title:       '',
            deadline:    `${new Date()}`,
            description: '',
            tag:         {
                bg:    '#fffaf0',
                color: '#ffab2b',
                id:    '8b535acc-623b-4ee3-9279-e6175159ff47',
                name:  'Sketch',
            },
        },
    });
    const selectedTag = form.watch('tag');
    const selectedDate = form.watch('deadline');
    console.log(selectedTask);
    useEffect(() => {
        if (selectedTask !== null) {
            form.reset({ ...state[ selectedTask ] });
        } else {
            form.reset({
                title:       '',
                deadline:    `${new Date()}`,
                description: '',
                tag:         {
                    bg:    '#fffaf0',
                    color: '#ffab2b',
                    id:    '8b535acc-623b-4ee3-9279-e6175159ff47',
                    name:  'Sketch',
                },
            });
        }
    }, [selectedTask]);
    registerLocale('ru', ru);
    const onSubmit = form.handleSubmit((credentials) => {
        // await login.mutateAsync(credentials);
        if (selectedTask) {
            dispatch(taskStateActions.editItem({ ...credentials, selectedTask }));
        } else {
            dispatch(taskStateActions.setNewState({ ...credentials }));
        }
        dispatch(settingActions.setSettingsOpen(false));
        dispatch(selectedTaskActions.selectTask(null));
    });

    const handlerOnClick = (event: SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(settingActions.setSettingsOpen(false));
    };
    const handlerDeleteClick = () => {
        dispatch(taskStateActions.deleteItem(selectedTask));
        dispatch(settingActions.setSettingsOpen(false));
        dispatch(selectedTaskActions.selectTask(null));
        form.reset();
    };


    return (
        <div className = 'task-card'>
            <form onSubmit = { onSubmit }>
                <div className = 'head'>
                    { selectedTask !== null && <button
                        type = 'button' onClick = { () => { form.setValue('completed', true); } }
                        className = 'button-complete-task'>завершить</button> }
                    { selectedTask !== null && <div onClick = { handlerDeleteClick } className = 'button-remove-task'></div> }
                </div>
                <div className = 'content'>
                    <label className = 'label'>
                        Задачи
                        <input
                            lang = 'en'
                            className = 'title'
                            placeholder = 'Пройти интенсив по React + Redux + TS + Mobx'
                            type = 'text'
                            { ...form.register('title') } />
                    </label>
                    <div className = 'deadline'>
                        <span className = 'label'>Дедлайн</span>
                        <span className = 'date'>
                            <ReactDatePicker
                                locale = 'ru'
                                dateFormat = 'dd MMM yyyy '
                                minDate = { new Date() }
                                { ...form.register('deadline') }
                                selected = { new Date(selectedDate) }
                                onChange = { (date) => form.setValue('deadline', `${date}`) } />
                        </span>
                    </div>
                    <div className = 'description'>
                        <label className = 'label'>
                            Описание
                            <textarea
                                className = 'text'
                                placeholder = 'После изучения всех технологий, завершить работу над проектами и найти работу.'
                                { ...form.register('description') }>
                            </textarea>
                        </label>
                    </div>
                    <Tag selectedTag = { selectedTag } setValue = { form.setValue } />
                    <div className = 'errors'>
                        <p className = 'errorMessage'>
                            Минимальная длина поля title — 3
                        </p>
                    </div>
                    <div className = 'form-controls'>
                        <button
                            type = 'reset'
                            className = 'button-reset-task'
                            onClick = { handlerOnClick }>
                            Reset
                        </button>
                        <button type = 'submit' className = 'button-save-task'>
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

