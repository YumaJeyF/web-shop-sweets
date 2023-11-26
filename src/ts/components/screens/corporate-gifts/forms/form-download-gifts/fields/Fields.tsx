import React, { Dispatch, FC, SetStateAction } from "react";
import styles from '../../Forms.module.scss';

import { IFieldsCorporateGifts } from "../../../../../../types";
import { UseFormRegister } from "react-hook-form";
import { IErrorsMessages } from "../../../../../../types";

import Input from "../../../../../ui/inputs/Input/Input";

const Fields: FC<{
    register: UseFormRegister<IFieldsCorporateGifts>,
    errorsMessages: IErrorsMessages,
    setIsChange: Dispatch<SetStateAction<boolean>>,
}> = ({
    register,
    errorsMessages,
    setIsChange,
}) => {

    return (
        <div className={styles.fields}>
            <div className={styles.block}>
                <label className='inp_n_f'>Ваше имя*</label>
            
                <Input<IFieldsCorporateGifts>
                    register={register}
                    nameReg="name"
                    options={{
                        required: 'Поле не может быть пустым',
                        pattern: {
                            value: /^([A-Za-z\-\']{1,50})|([А-Яа-я\-\']{1,50})$/,
                            message: 'Пожалуйста введите валидное имя'
                        },
                        onChange: () => setIsChange(true)
                    }}
                    error={errorsMessages.errName}
                    placeholder="Укажите имя"
                    type="text"
                    name="name"
                    id='d_name'
                    className='inp_f_st m_inp_f'
                    errorClass='inp_f_er'
                />
            </div>
            <div className={styles.block}>
                <label className='inp_n_f'>Ваше телефон*</label>
  
                <Input<IFieldsCorporateGifts>
                    register={register}
                    nameReg="phone"
                    options={{
                        required: 'Поле не может быть пустым',
                        pattern: {
                            value: /^\+7\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/,
                            message: 'Пожалуйста введите валидный номер телефона'
                        },
                        onChange: () => setIsChange(true)
                    }}
                    error={errorsMessages.errPhone}
                    placeholder="+7 (___) ___-__-__"
                    type="tel"
                    name="phone"
                    id='d_phone'
                    className='inp_f_st m_inp_f'
                    errorClass='inp_f_er'
                />
            </div>
            <div className={styles.block}>
                <label className='inp_n_f'>Название компании</label>
    
                <Input<IFieldsCorporateGifts>
                    register={register}
                    nameReg="company"
                    options={{
                        required: 'Поле не может быть пустым',
                        onChange: () => setIsChange(true)
                    }}
                    error={errorsMessages.errCompany}
                    type="text"
                    name="company"
                    id='d_company'
                    className='inp_f_st m_inp_f'
                    errorClass='inp_f_er'
                />
            </div>
            <div className={styles.block}> 
                <label className='inp_n_f'>E-mail</label>
            
                <Input<IFieldsCorporateGifts>
                    register={register}
                    nameReg="email"
                    options={{
                        required: 'Поле не может быть пустым',
                        pattern: {
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                            message: 'Введите валидный email'
                        },
                        onChange: () => setIsChange(true)
                    }}
                    error={errorsMessages.errEmail}
                    type="email"
                    name="email"
                    id='d_email'
                    className='inp_f_st m_inp_f'
                    errorClass='inp_f_er'
                />
            </div>
        </div>
    )
}

export default React.memo(Fields);