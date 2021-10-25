// Core
import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export const Input: FC<IPropTypes> = (props) => {
    const input = (
        <input
            placeholder = { props.placeholder }
            type = { props.type }
            lang = { props.lang }
            { ...props.register } />
    );


    return (
        <label>
            <div>
                { props.label }{ ' ' }
                <span className = 'error-message'>{ props.error?.message }</span>
            </div>
            { input }
        </label>
    );
};

Input.defaultProps = {
    type: 'text',
    tag:  'input',
};

interface IPropTypes {
    placeholder?: string;
    type?: string;
    tag?: string;
    label: string;
    lang?: string;
    register: UseFormRegisterReturn;
    error?: {
        message?: string;
    };
    options?: { value: string; name: string }[];
}
