import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useProfile } from '../hooks/useTags';
import { getTagState } from '../lib/redux/selectors/tagStore';
import { ITagType } from '../types/ITagType';

type props = {
    selectedTag:ITagType;
    setValue: UseFormReturn['setValue'];
};


export const Tag: FC<props> = ({ selectedTag, setValue }) => {
    useProfile();
    const tags = useSelector(getTagState);

    const tagJSX
        = Array.isArray(tags)
        && tags.map((tag) => {
            return (
                <span
                    onClick = { () => setValue('tag', tag) }
                    key = { tag.id }
                    className = { `tag ${selectedTag.id === tag.id ? 'selected' : ''} ` }
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
