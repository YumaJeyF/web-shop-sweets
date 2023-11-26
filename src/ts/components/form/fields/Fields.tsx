import React, { Dispatch, FC, SetStateAction } from 'react';
import styles from '../Form.module.scss';
import cn from 'classnames';

import { UseFormRegister } from 'react-hook-form';
import { IFormFields } from '../../../types';
import { ClassTextarea } from '../../../types';
import { ErrorsMessagesForm } from '../../../types';

import Input from '../../ui/inputs/Input/Input';
import Textarea from '../../ui/textarea/Textarea';

const Fields: FC<{
    classFields: string | undefined,
    classNameBlock: string  | undefined,
    register: UseFormRegister<IFormFields>,
    errors: ErrorsMessagesForm,
    setIsChange: Dispatch<SetStateAction<boolean>>,
    classTextarea: ClassTextarea  | undefined,
    nameSaveScroll: string
}> = ({
    classFields,
    classNameBlock,
    register,
    errors,
    setIsChange,
    classTextarea,
    nameSaveScroll
}) => {
    return (
        <div className={cn({
            [`${classFields}`]: classFields,
            [styles.form_container]: !classFields
        })}>
            <div className={cn(styles.block_inf, { [`${classNameBlock}`]: classNameBlock })}>
                <label className="inp_n_f">Ваше имя*</label>
                <Input<IFormFields>
                    nameReg='name'
                    register={register}
                    options={{
                        required: 'Недопустимое значение',
                        pattern: {
                            value: /^([A-Za-z\-\']{1,50})|([А-Яа-я\-\']{1,50})$/,
                            message: 'Пожалуйста введите валидное имя'
                        },
                        onChange: () => setIsChange(true)
                    }}
                    error={errors.name}
                    type='text'
                    name='name'
                    id='f_name'
                    className='inp_f_st m_inp_f'
                    errorClass='inp_f_er'
                    placeholder='Укажите имя'
                />
            </div>
            <div className={cn(styles.block_inf, { [`${classNameBlock}`]: classNameBlock })}>
                <label className="inp_n_f">Ваш телефон*</label>
                <Input<IFormFields>
                    register={register}
                    nameReg='telephone'
                    options={{
                        required: 'Недопустимое значение',
                        pattern: {
                            value: /^\+7\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/,
                            message: 'Пожалуйста введите валидный номер телефона'
                        },
                        onChange: () => setIsChange(true)
                    }}
                    error={errors.telephone}
                    type='tel'
                    name='telephone'
                    id='f_telephone'
                    className='inp_f_st m_inp_f'
                    errorClass='inp_f_er'
                    placeholder='+7 (___) ___-__-__'
                />
            </div>
            <div className={cn(styles.block_inf, { [`${classNameBlock}`]: classNameBlock })}>
                <label className="inp_n_f">Название компании</label>
                <Input<IFormFields>
                    register={register}
                    nameReg='nameCompany'
                    options={{
                        required: 'Недопустимое значение',
                        onChange: () => setIsChange(true)
                    }}
                    error={errors.nameCompany}
                    type='text'
                    name='nameCompany'
                    id='f_nameCompany'
                    className='inp_f_st m_inp_f'
                    errorClass='inp_f_er'
                    placeholder='Укажите название компании'
                />
            </div>
            <div className={cn(styles.block_inf, { [`${classNameBlock}`]: classNameBlock })}>
                <label className="inp_n_f">E-mail</label>
                <Input<IFormFields>
                    register={register}
                    nameReg='email'
                    options={{
                        required: 'Недопустимое значение',
                        pattern: {
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                            message: 'Пожалуйста введите валидный email'
                        },
                        onChange: () => setIsChange(true)
                    }}
                    error={errors.email}
                    type='email'
                    name='email'
                    id='f_email'
                    className='inp_f_st m_inp_f'
                    errorClass='inp_f_er'
                    placeholder='Укажите e-mail адрес'
                />
            </div>
            <div className={cn(styles.block_inf, {
                [styles.last_block]: !classNameBlock,
                [`${classNameBlock}`]: classNameBlock,
                [`${classTextarea?.parentBlock}`]: classTextarea
            })}>
                <label className="inp_n_f">Добавить комментарий</label>
                <Textarea
                    register={register}
                    nameReg='comment'
                    options={{
                        required: 'Недопустимое значение',
                        onChange: () => setIsChange(true)
                    }}
                    error={errors.comment}
                    name='comment'
                    id='f_comment'
                    className={cn('inp_f_st m_inp_f', {
                        [`${classTextarea?.textarea}`]: classTextarea,
                        [styles.textarea]: !classTextarea
                    })}
                    errorClass='inp_f_er'
                    nameSaveScrollHeight={nameSaveScroll}
                />
            </div>
        </div>
    )
}

export default React.memo(Fields);