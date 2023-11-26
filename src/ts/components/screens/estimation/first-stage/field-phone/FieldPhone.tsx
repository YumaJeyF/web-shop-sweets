import React, { FC } from "react";

import { IFieldsSecondStage } from '../FirstStage';
import { vars } from '../../../../../vars';

import InputMask from "../../../../ui/inputs/InputMask/InputMask";
import { UseFormRegister } from "react-hook-form";
import { Error } from "../../../../../types";

const FieldPhone: FC<{ register: UseFormRegister<IFieldsSecondStage>, error: Error }> = ({ register, error }) => {
    const { regPhone } = vars;

    return (
            <InputMask<IFieldsSecondStage>
                register={register}
                nameReg="phone"
                options={{
                    required: 'Недопустимое значение',
                    pattern: {
                        value: regPhone,
                        message: 'Пожалуйста введите валидный номер телефона'
                    }
                }}
                name="phone"
                placeholder='+7 (___) ___-__-__'
                mask="+7 (999) 999-99-99"
                type="tel"
                error='empty'
                className="inp_f_st m_inp_f"
            />
    )
}

export default React.memo(FieldPhone);