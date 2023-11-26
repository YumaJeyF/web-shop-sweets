import React, { useState } from 'react';
import styles from '../Inputs.module.scss';
import cn from 'classnames';

import { FieldValues } from 'react-hook-form';

import IconPassword from '../icon-password/IconPassword';
import ReactInputMask from 'react-input-mask';

import { IInputMask } from '../../../../types';

const InputMask = <T extends FieldValues,>({
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
    onInput,
    mask
}: IInputMask<T>): JSX.Element => {
    const [ isHidden, setIsHidden ] = useState<boolean>(true);

    return (
        <div>
            <div style={{ position: 'relative' }}>
                <ReactInputMask
                    mask={mask} 
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
                { type === 'password' &&  <IconPassword isHidden={isHidden} setIsHidden={setIsHidden}/>}
            </div>
            { error == 'empty' && value && <label htmlFor={id} className='inp_n_f'>{value}</label> }
            { ( error && error != 'empty' ) && <p className={errorClass}>{error}</p> }
        </div>
    )
}

export default InputMask;