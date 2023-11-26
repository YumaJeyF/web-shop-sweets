import React, { useState } from 'react';
import styles from '../Inputs.module.scss';
import cn from 'classnames';

import { FieldValues } from 'react-hook-form';
import { IFormInput } from '../../../../types';

import IconPassword from '../icon-password/IconPassword';

const Input = <T extends FieldValues,>({
    register,
    nameReg,
    options,
    type,
    name,
    value,
    placeholder,
    className,
    onClick,
    id,
    error,
    errorClass,
    onInput
}: IFormInput<T>): JSX.Element => {
    const [ isHidden, setIsHidden ] = useState<boolean>(true);

    return (
        <div>
            <div style={{ position: 'relative' }}>
                <input 
                    { ...register(nameReg, options) }
                    type={ type === 'password' ? ( isHidden ? 'password' : 'text' ) : type }
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    className={cn(className, { [styles.inp_password]: type === 'password' })}
                    onClick={onClick}
                    id={id}
                    onInput={onInput}
                />
                { error == 'empty' && value && <label htmlFor={id} className='inp_n_f'>{value}</label> }
                { type === 'password' &&  <IconPassword isHidden={isHidden} setIsHidden={setIsHidden}/>}
            </div>
            { ( error && error != 'empty' ) && <p className={errorClass}>{error}</p> }
        </div>
    )
}

export default Input;