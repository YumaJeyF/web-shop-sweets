import React, { FC, Dispatch, SetStateAction } from "react";
import styles from './Fields.module.scss';

import { UseFormRegister, UseFormSetError } from "react-hook-form";
import { useQueries } from "@tanstack/react-query";
import { getUser } from "../../../../../services/getUser";

import { IRegistrationFields } from "../../../../../types";
import { Error } from "../../../../../types";
import { RegData } from "../../../../../types";

import Input from "../../../../ui/inputs/Input/Input";
import InputMask from "../../../../ui/inputs/InputMask/InputMask";

import { vars } from "../../../../../vars";

const Fields: FC<{
    register: UseFormRegister<IRegistrationFields>,
    setError: UseFormSetError<IRegistrationFields>,
    setBtnDisabled: Dispatch<SetStateAction<boolean>>,
    errors: {
        name: Error,
        tel: Error,
        email: Error,
        city: Error,
        company: Error,
        password: Error
    },
    values: {
        email: string,
        tel: string
    }
}> = ({
    register,
    setError,
    setBtnDisabled,
    errors,
    values
}) => {
    const { regEmail, regPassword, regPhone, regName } = vars;

    useQueries<[
        { data: RegData },
        { data: RegData }
    ]>({
        queries: [
            {
                queryKey: ['get-by-email', values.email ],
                queryFn: () => {
                    if (regEmail.test(values.email)) return getUser.getUserByEmail(values.email);
                    else return null;
                },
                onSuccess(data: RegData) {
                    if (data) {
                        if (data != 'user not found') {
                            setBtnDisabled(true);
                            setError('email', { type: 'custom', message: 'Пользователь с такой почтой уже зарегистрирован' });
                        }
                        else setBtnDisabled(false);
                    }
                },
            },
            { 
                queryKey: ['get-by-tel', values.tel ],
                queryFn: () => {
                    if (regPhone.test(values.tel)) return getUser.getUserByTel(values.tel);
                    else return null;
                },
                onSuccess(data: RegData) {
                    if (data) {
                        if (data != 'user not found') {
                            setBtnDisabled(true);
                            setError('tel', { type: 'custom', message: 'Пользователь с таким телефоном уже зарегистрирован' });
                        }
                        else setBtnDisabled(false);
                    }
                }
            },
        ]
    });

    return (
        <div className={styles.fields}>
            <div className={styles.block}>
                <label className='inp_n_f'>Ваше имя</label>
                <Input<IRegistrationFields>
                    register={register}
                    nameReg='name'
                    options={{
                        required: 'Поле не может быть пустым',
                        pattern: {
                            value: regName,
                            message: 'Пожалуйста введите валидное имя'
                        }
                    }}
                    name="name"
                    id="reg_name"
                    type="text"
                    placeholder="Укажите имя"
                    error={errors.name}
                    className="m_inp_f inp_f_st"
                    errorClass="inp_f_er"
                />
            </div>
            <div className={styles.block}>
                <label className='inp_n_f'>Ваш телефон</label>
                <InputMask<IRegistrationFields>
                    mask='+7 (999) 999-99-99'
                    register={register}
                    nameReg='tel'
                    options={{
                        required: 'Поле не может быть пустым',
                        pattern: {
                            value: regPhone,
                            message: 'Пожалуйста введите валидный номер телефона'
                        }
                    }}
                    name="tel"
                    id="reg_tel"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    error={errors.tel}
                    className="m_inp_f inp_f_st"
                    errorClass="inp_f_er"
                />
            </div>
            <div className={styles.block}>
                <label className='inp_n_f'>E-mail</label>
                <Input<IRegistrationFields>
                    register={register}
                    nameReg='email'
                    options={{
                        required: 'Поле не может быть пустым',
                        pattern: {
                            value: regEmail,
                            message: 'Пожалуйста введите валидный email'
                        }
                    }}
                    name="email"
                    id="reg_email"
                    type="email"
                    placeholder="Укажите e-mail"
                    error={errors.email}
                    className="m_inp_f inp_f_st"
                    errorClass="inp_f_er"
                />
            </div>
            <div className={styles.block}>
                <label className='inp_n_f'>Город</label>
                <Input<IRegistrationFields>
                    register={register}
                    nameReg='city'
                    options={{
                        required: 'Поле не может быть пустым'
                    }}
                    name="city"
                    id="reg_city"
                    type="text"
                    error={errors.city}
                    className="m_inp_f inp_f_st"
                    errorClass="inp_f_er"
                />
            </div>
            <div className={styles.block}>
                <label className='inp_n_f'>Компания</label>
                <Input<IRegistrationFields>
                    register={register}
                    nameReg='company'
                    options={{
                        required: 'Поле не может быть пустым'
                    }}
                    name="company"
                    id="reg_company"
                    type="text"
                    error={errors.company}
                    className="m_inp_f inp_f_st"
                    errorClass="inp_f_er"
                />
            </div>
            <div className={styles.block}>
                <label className='inp_n_f'>Придумайте пароль</label>
                <Input<IRegistrationFields>
                    register={register}
                    nameReg='password'
                    options={{
                        required: 'Поле не может быть пустым',
                        pattern: {
                            message: 'Пароль может содержать только символы: A-z, 0-9, ! @ # $ % ^ & * ( ) _ - + ,',
                            value: regPassword
                        }
                    }}
                    name="password"
                    id="reg_password"
                    type='password'
                    error={errors.password}
                    className="m_inp_f inp_f_st"
                    errorClass="inp_f_er"
                />
            </div>
        </div>
    )
}

export default React.memo(Fields);