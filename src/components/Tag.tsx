import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getTagState } from '../lib/redux/selectors/tagStore';

type props = {
    selectedTag:string;
    setValue: UseFormReturn['setValue'];
};


export const Tag: FC<props> = ({ selectedTag, setValue }) => {
    const tags = useSelector(getTagState);

    const tagJSX
        = Array.isArray(tags)
        && tags.map((tag) => {
            return (
                <span
                    onClick = { () => setValue('tag', tag.id) }
                    key = { tag.id }
                    className = { `tag ${selectedTag === tag.id ? 'selected' : ''} ` }
                    style = { {
                        color:           tag.color,
                        backgroundColor: tag.bg,
                    } }>
                    { tag.name }
                </span>
            );
        });

    return <div className = 'tags'>{ tagJSX }</div>;
};
