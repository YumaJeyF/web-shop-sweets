import React, { FC } from "react";
import styles from '../DeliveryProduct.module.scss';
import cn from 'classnames';

import Input from "../../../../../ui/inputs/Input/Input";
import InputMask from "../../../../../ui/inputs/InputMask/InputMask";

import { vars } from "../../../../../../vars";

import { IMainInp } from "../typesDelivery";
import { IFormDeliveryProduct } from "../typesDelivery";

const MainInp: FC<IMainInp> = ({ register, errorName, errorTel, changeIsReload }) => {
    const { regPhone } = vars;

    return (
        <div className={cn(styles.form_flex, styles.form_block)}>
        <div className={styles.inp_block}>
            <h4 className='inp_n_f'>Ваше имя*</h4>
            <Input<IFormDeliveryProduct>
                register={register}
                error={errorName}
                nameReg={'name'}
                options={{
                    required: 'Вы ввели неверное значение',
                    pattern: {
                        value: /^([A-Za-z\-\']{1,50})|([А-Яа-я\-\']{1,50})$/,
                        message: 'Пожалуйста введите валидное имя'
                    },
                    onChange() { changeIsReload() }
                }}
                type='text'
                name='name'
                placeholder='Укажите имя'
                className='textmiddle m_inp_f inp_f_st'
                errorClass="inp_f_er"
            />
        </div>
        <div className={styles.inp_block}>
            <h4 className='inp_n_f'>Ваш телефон*</h4>
            <InputMask<IFormDeliveryProduct>
                register={register}
                error={errorTel}
                nameReg={'phone'}
                mask='+7 (999) 999-99-99'
                options={{
                    required: 'Вы ввели неверное значение',
                    pattern: {
                        value: regPhone,
                        message: 'Пожалуйста введите валидный номер телефона'
                    },
                    onChange() { changeIsReload() }
                }}
                type='tel'
                name='phone'
                placeholder='+7 (___) ___-__-__'
                className='textmiddle m_inp_f inp_f_st'
                errorClass="inp_f_er"
            />
        </div>
    </div>
    )
}

export default React.memo(MainInp);