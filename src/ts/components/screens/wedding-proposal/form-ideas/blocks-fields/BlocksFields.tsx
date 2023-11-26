import React, { Dispatch, FC, SetStateAction } from "react";
import styles from './BlocksFields.module.scss';
import cn from 'classnames';

import { UseFormRegister } from "react-hook-form";

import Input from "../../../../ui/inputs/Input/Input";
import Textarea from "../../../../ui/textarea/Textarea";
import { IFieldsFormIdeas } from "../../../../../types";

const BlocksFields: FC<{ 
    register: UseFormRegister<IFieldsFormIdeas>,
    errors: {
        name: string | undefined,
        telephone: string | undefined,
        proposal: string | undefined
    },
    setIsChange: Dispatch<SetStateAction<boolean>>
}> = ({
    register,
    errors,
    setIsChange
}) => {
    return (
        <div className={styles.blocks_fields}>
            <div className={styles.block}>
                <label className={cn(styles.name_field, 'textmini')}>Ваше имя*</label>
                <Input<IFieldsFormIdeas>
                    register={register}
                    options={{
                        required: 'Недопустимое значение',
                        pattern: {
                            value: /^([A-Za-z\-\']{1,50})|([А-Яа-я\-\']{1,50})$/,
                            message: 'Пожалуйста введите валидное имя'
                        },
                        onChange: () => setIsChange(true)
                    }}
                    nameReg="name"
                    type="text"
                    name="name"
                    id="i_name"
                    placeholder="Укажите имя"
                    error={errors.name}
                    className="inp_f_st m_inp_f"
                    errorClass="inp_f_er"
                />
            </div>
            <div className={styles.block}>
                <label className={cn(styles.name_field, 'textmini')}>Телефон*</label>
                <Input<IFieldsFormIdeas>
                    register={register}
                    nameReg="telephone"
                    options={{
                        required: 'Недопустимое значение',
                        pattern: {
                            value: /^((\+7|7|8)+([0-9]){10})$/,
                            message: 'Пожалуйста введите валидный номер телефона'
                        },
                        onChange: () => setIsChange(true)
                    }}
                    type="tel"
                    name="telephone"
                    id="i_tel"
                    placeholder="+7 (___) ___-__-__"
                    error={errors.telephone}
                    className="inp_f_st m_inp_f"
                    errorClass="inp_f_er"
                />
            </div>
            <div className={styles.block}>
                <label className={cn(styles.name_field, 'textmini')}>Опишите вашу проблему</label>
                <Textarea<IFieldsFormIdeas>
                    register={register}
                    nameReg="proposal"
                    options={{
                        required: 'Недопустимое значение',
                        onChange: () => setIsChange(true)
                    }}
                    name="proposal"
                    id="i_proposal"
                    error={errors.proposal}
                    className={cn("inp_f_st m_inp_f", styles.textarea)}
                    errorClass="inp_f_er"
                    nameSaveScrollHeight="formIdeasScrollHeight"
                />
            </div>
        </div>
    )
}

export default React.memo(BlocksFields);