import React, { FC, useEffect, useState, useRef } from 'react';
import styles from '../Fields.module.scss';

import Input from '../../../../../ui/inputs/Input/Input';

import { IPasswordRecoveryFields } from '../../../../../../types';
import { Error } from '../../../../../../types';
import { IUser } from '../../../../../../types';

import { UseFormRegister } from 'react-hook-form';
import { vars } from '../../../../../../vars';
import { getUser } from '../../../../../../services/getUser';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';
import { useActions } from '../../../../../../hooks/useActions';
import secureLocalStorage from 'react-secure-storage';

interface IRecPass {
    newPassword: string,
    duplicatePassword: string
}

const SecondFields: FC<{
    register: UseFormRegister<IPasswordRecoveryFields>,
    newPassword: Error,
    duplicatePassword: Error,
}> = ({
    register,
    newPassword,
    duplicatePassword,
}) => {
    const { regPassword } = vars;
    const { userFoundId } = useAppSelector(state => state.user);
    const { setBtnDisRecPass, setIsNextPage, setConfirmChange } = useActions();
    const values = useRef<IRecPass>({ newPassword: '', duplicatePassword: '' });
    const errors = useRef<IRecPass>({ newPassword: '', duplicatePassword: '' });
    const [ firstRender, setFirstRender ] = useState<boolean>(true);

    const { data } = useQuery<IUser>(['get-user-by-id'], () => getUser.getUserById(userFoundId));

    useEffect(() => {
        if (!firstRender) {
            if (errors.current.duplicatePassword === '' && errors.current.newPassword === '') {
                setBtnDisRecPass(false);
                setConfirmChange(true);
            }
            else setBtnDisRecPass(true);
        }
        setFirstRender(false);
    }, [ errors, values.current.duplicatePassword, values.current.newPassword ]);

    const complianceCheck = (value: string) => {
        if (!secureLocalStorage.getItem('ufi')) setIsNextPage(false);

        if (data && regPassword.test(value)) {
            if (values.current.newPassword != value) {
                errors.current.duplicatePassword = 'Пароли не совпадают';
                setBtnDisRecPass(true);
            } else {
                values.current.duplicatePassword = value;
                errors.current.duplicatePassword = '';
                setBtnDisRecPass(false);
            }
        } else if (!regPassword.test(value)) errors.current.duplicatePassword = '';
    } 

    const CheckWithOldPassword = (value: string) => {
        if (!secureLocalStorage.getItem('ufi')) setIsNextPage(false);

        if (data && regPassword.test(value)) {
            if (value === data.password) {
                errors.current.newPassword = 'Новый пароль не может совпадать со старым';
                setBtnDisRecPass(true);
            }
            else {
                errors.current.newPassword = '';
                setBtnDisRecPass(false);
                values.current.newPassword = value;
                complianceCheck(values.current.duplicatePassword);
            }
        }
    }

    return (
        <div className={styles.fields}>
            <div className={styles.block}>
            <label className='inp_n_f'>Придумайте новый пароль</label>
            <Input<IPasswordRecoveryFields>
                register={register}
                nameReg='newPassword'
                options={{
                    required: 'Поле не может быть пустым',
                    pattern: {
                        message: 'Пароль может содержать только символы: A-z, 0-9, ! @ # $ % ^ & * ( ) _ - + ,',
                        value: regPassword
                    },
                    onChange(e: React.MouseEvent) { CheckWithOldPassword((e.currentTarget as HTMLInputElement).value) }
                }}
                name="newPassword"
                id="new_password"
                type='password'
                error={errors.current.newPassword != '' ? errors.current.newPassword : newPassword}
                className="m_inp_f inp_f_st"
                errorClass="inp_f_er"
            />
            </div>
            <div className={styles.block}>
            <label className='inp_n_f'>Повторите новый пароль</label>
            <Input<IPasswordRecoveryFields>
                register={register}
                nameReg='duplicatePassword'
                options={{
                    required: 'Поле не может быть пустым',
                    pattern: {
                        message: 'Пароль может содержать только символы: A-z, 0-9, ! @ # $ % ^ & * ( ) _ - + ,',
                        value: regPassword
                    },
                    onChange(e: React.MouseEvent) { complianceCheck((e.currentTarget as HTMLInputElement).value) }
                }}
                name="duplicatePassword"
                id="duplicate_password"
                type='password'
                error={errors.current.duplicatePassword != '' ? errors.current.duplicatePassword : duplicatePassword}
                className="m_inp_f inp_f_st"
                errorClass="inp_f_er"
            />
            </div>
        </div>
    )
}

export default React.memo(SecondFields);