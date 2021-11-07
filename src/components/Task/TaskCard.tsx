import { SyntheticEvent, useEffect } from 'react';
import ReactDatePicker, { registerLocale }  from 'react-datepicker';
import { useForm } from 'react-hook-form';
import  ru  from 'date-fns/locale/ru';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingActions } from '../../lib/redux/actions/newTaskForm';
import { taskStateActions } from '../../lib/redux/actions/taskManager';
import { useAppDispatch } from '../../lib/redux/init/store';
import { getTaskState } from '../../lib/redux/selectors/stateManager';
import { getSelectedTaskID } from '../../lib/redux/selectors/selectedTask';
import { Tag } from '../Tag';
import { schema } from './config';
import { defaultValues } from '../../constants/defaultValues';

export type formTaskType = {
    completed:boolean;
    title:string;
    deadline:string;
    description:string;
    tag:string;
};
registerLocale('ru', ru);

export const TaskCard = () => {
    const dispatch = useAppDispatch();
    const state = useSelector(getTaskState);
    const selectedTask = useSelector(getSelectedTaskID);
    const form = useForm<formTaskType>({
        mode:     'onTouched',
        resolver: yupResolver(schema),
        defaultValues,
    });
    const selectedTag = form.watch('tag');
    const selectedDate = form.watch('deadline');
    useEffect(() => {
        if (selectedTask) {
            const {
                completed, title, deadline, description, tag,
            } = state[ state.findIndex((item) => item.id === selectedTask) ];

            form.reset({
                completed, title, deadline, description, tag: tag.id,
            });
        } else {
            form.reset(defaultValues);
        }
    }, [selectedTask]);

    const onSubmit = form.handleSubmit((credentials) => {
        if (selectedTask) {
            dispatch(taskStateActions.editItem(true));
        } else {
            dispatch(taskStateActions.postItem(true));
        }
        dispatch(taskStateActions.setNewState({ ...credentials }));
        dispatch(settingActions.setSettingsOpen(false));
    });

    const handlerOnClick = (event: SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(settingActions.setSettingsOpen(false));
    };
    const handlerDeleteClick = (event: SyntheticEvent<HTMLDivElement>) => {
        event.preventDefault();
        dispatch(settingActions.setSettingsOpen(false));
        dispatch(taskStateActions.deleteItem(true));
        form.reset();
    };


    return (
        <div className = 'task-card'>
            <form onSubmit = { onSubmit }>
                <div className = 'head'>
                    { selectedTask  && <button
                        type = 'submit' onClick = { () => { form.setValue('completed', true); } }
                        className = 'button-complete-task'>завершить</button> }
                    { selectedTask  && <div onClick = { handlerDeleteClick } className = 'button-remove-task'></div> }
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
                            { form.formState.errors?.title?.message }
                        </p>
                        <p className = 'errorMessage'>
                            { form.formState.errors?.description?.message }
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

