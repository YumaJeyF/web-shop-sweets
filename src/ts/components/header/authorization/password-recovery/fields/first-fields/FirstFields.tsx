import React, { Dispatch, FC, SetStateAction, useState } from "react";
import styles from '../Fields.module.scss';

import { IPasswordRecoveryFields } from "../../../../../../types";
import { IUser } from "../../../../../../types";
import { Error } from "../../../../../../types";

import Input from "../../../../../ui/inputs/Input/Input";

import { UseFormRegister, UseFormSetError } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../../../../services/getUser";
import { useActions } from "../../../../../../hooks/useActions";
import { vars } from "../../../../../../vars";

const FirstFields: FC<{
    register: UseFormRegister<IPasswordRecoveryFields>,
    errorEmail: Error,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: UseFormSetError<IPasswordRecoveryFields>,
}> = ({
    register,
    errorEmail,
    setLoading,
    setError,
}) => {
    const { regEmail } = vars;
    const [ emailValue, setEmailValue ] = useState<string>('');
    const { setUserFoundId, setBtnDisRecPass } = useActions();

    useQuery<IUser | null | string>(['search-user-by-email', emailValue], 
        () => {
            if (regEmail.test(emailValue)) {
                setLoading(true);
                return getUser.getUserByEmail(emailValue);
            }
            else return null
        },
        {
            onSuccess(data: IUser | null | string) {
                setLoading(false);

                if (data) {
                    if (data === 'user not found') {
                        setError('email', { type: 'email', message: 'Пользователь с такой почтой не найден' });
                        setBtnDisRecPass(true);
                    }
                    else if (typeof data !== 'string') {
                        setBtnDisRecPass(false);
                        setUserFoundId(data.personalId);
                    }
                }
            }
        }
    )

    return (
        <div className={styles.block}>
            <label className="inp_n_f">E-mail</label>
            <Input<IPasswordRecoveryFields>
                register={register}
                nameReg="email"
                options={{
                    required: 'Поле не может быть пустым',
                    pattern: {
                        value: regEmail,
                        message: 'Введите валидный email'
                        },
                        onChange: (e: React.MouseEvent) => setEmailValue((e.currentTarget as HTMLInputElement).value)
                }}
                name="email"
                id="pr_email"
                error={errorEmail}
                type="email"
                className='inp_f_st m_inp_f'
                errorClass='inp_f_er'
            />
       </div>
    )
}

export default React.memo(FirstFields);