import React, { useState } from 'react';
import styles from './Textarea.module.scss';
import cn from 'classnames';

import { IFormInput } from '../../../types';
import { FieldValues } from 'react-hook-form';

interface ITextarea<T extends FieldValues> extends IFormInput<T> {
    nameSaveScrollHeight: string
}

const Textarea = <T extends FieldValues,>({ register, error, nameReg, options, name, placeholder, className, errorClass, nameSaveScrollHeight }: ITextarea<T>) => {
    const [ scrollHeight, setScrollHeight ] = useState<number>(
        sessionStorage.getItem(nameSaveScrollHeight)
        ? JSON.parse(String(sessionStorage.getItem(nameSaveScrollHeight)))
        : 0
    );

    const autoChangeHeight = (textarea: HTMLTextAreaElement): void => {
        if (textarea) {
            let scrollHeight: number = textarea.scrollHeight;

            if (textarea.value === '') scrollHeight = 0;

            setScrollHeight(scrollHeight);
            textarea.style.height = 'auto';
            textarea.style.height = scrollHeight + 'px';
            sessionStorage.setItem(nameSaveScrollHeight, JSON.stringify(scrollHeight));
        }
    }


    return (
        <>
            <textarea { ...register(nameReg, options)}
                name={name}
                className={cn(className, styles.textarea)}
                placeholder={placeholder}
                style={{
                    height: scrollHeight + 'px',
                    overflowY: scrollHeight > 400 ? 'visible' : 'hidden'
                }}
                onInput={(e: React.MouseEvent<HTMLTextAreaElement>) => autoChangeHeight(e.currentTarget)}
            />
           { error && <p className={errorClass}>{error}</p> }
        </>
    )
}

export default Textarea;
