import React, { Dispatch, FC, SetStateAction } from "react";
import styles from './Fields.module.scss';

import { ILoginFields } from "../../../../../types";
import { UseFormRegister } from "react-hook-form";

import Input from "../../../../ui/inputs/Input/Input";

const Fields: FC<{
    register: UseFormRegister<ILoginFields>,
    errors: {
        email: string | undefined,
        password: string | undefined
    },
    btnDisabled: boolean,
    setBtnDisabled: Dispatch<SetStateAction<boolean>>
}> = ({
    register,
    errors,
    btnDisabled,
    setBtnDisabled
}) => {
    return (
        <div className={styles.fields}>
            <div className={styles.block}>
                <label className="inp_n_f">E-mail</label>
                <Input<ILoginFields>
                    register={register}
                    nameReg="email"
                    options={{
                        required: 'Поле не может быть пустым',
                        pattern: {
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                            message: 'Введите валидный email'
                        },
                        onChange: () => {
                            if (btnDisabled) setBtnDisabled(false);
                        }
                    }}
                    name="email"
                    id="l_email"
                    error={errors.email}
                    type="email"
                    placeholder="E-mail"
                    className='inp_f_st m_inp_f'
                    errorClass='inp_f_er'
                />
            </div>
            <div className={styles.block}>
                <label className="inp_n_f">Пароль</label>
                <Input<ILoginFields>
                    register={register}
                    nameReg="password"
                    options={{
                        required: 'Поле не может быть пустым',
                        onChange: () => {
                            if (btnDisabled) setBtnDisabled(false);
                        }
                    }}
                    name="password"
                    id="l_password"
                    error={errors.password}
                    type="password"
                    className='inp_f_st m_inp_f'
                    errorClass='inp_f_er'
                />
            </div>
        </div>
    )
}

export default React.memo(Fields);