import React, { FC, useState } from 'react';
import styles from './PasswordRecovery.module.scss';
import cn from 'classnames';

import '../Authorization.scss';

import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useActions } from '../../../../hooks/useActions';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { patchNewPassword } from '../../../../services/patchNewPassword';

import { IAuthorization } from '../../../../types';
import { IPasswordRecoveryFields } from '../../../../types';
import { PatchNewPassword } from '../../../../types';

import BtnClose from '../../../ui/btn-close/BtnClose';
import Fields from './fields/Fields';
import BtnAuthorization from '../../../ui/btn-authorization/BtnAuthorization';

const PasswordRecovery: FC<IAuthorization> = ({ isVisible, closeModal }) => {
    const { handleSubmit, register, formState: { errors, isValid }, setError, watch } = useForm<IPasswordRecoveryFields>({ mode: 'onChange' });
    const objWatch = watch();

    const [ loading, setLoading ] = useState<boolean>(false);
    const { setIsNextPage, setTextNotify, setNameForm, setUserFoundId, removeUserFoundId } = useActions();
    const { isNextPage, userFoundId, btnDisRecPass, confirmChange, isLogin } = useAppSelector(state => state.user);

    const mutations = useMutation(
        (data: PatchNewPassword) => {
            setLoading(true);
            return patchNewPassword(data.personalId, data.password);
        },
        {
            onSuccess() {
                setTimeout(() => {
                    setLoading(false);
                    setNameForm('login');
                    removeUserFoundId(true);
                    setIsNextPage(false);
                    setTextNotify('Вы успешно сменили пароль. Теперь вы можете войти в аккаунт.');
                }, 500);
            }
        }
    );
    
    const onSubmit: SubmitHandler<IPasswordRecoveryFields> = () => {
        if (isLogin) setIsNextPage(true);
        if (confirmChange && isLogin && objWatch.duplicatePassword && objWatch.duplicatePassword != '') mutations.mutate({ personalId: userFoundId, password: objWatch.duplicatePassword });
    }

    return (
        <form className={cn(styles.form, 'form_m modal_content', { 'active': isVisible })} onSubmit={handleSubmit(onSubmit)} id="entry-form">
            <BtnClose customClass='btn_close_m' onClick={closeModal} classPath='btn_path_m'/>
            <h1 className={cn(styles.title, 'titlemain')}>Забыли пароль?</h1>
            { userFoundId === '' && <p className={cn(styles.text, 'textmiddle')}>Введите свой email для того, чтобы мы смогли найти вас.</p> }

            <Fields 
                register={register}
                setError={setError}
                setLoading={setLoading}
                errors={{
                    email: errors.email?.message,
                    newPassword: errors.newPassword?.message,
                    duplicatePassword: errors.duplicatePassword?.message
                }}
            />

            <BtnAuthorization loading={loading} customClass={styles.btn} conditionActive={!isValid || btnDisRecPass} nameBtn={isNextPage ? 'Подтвердить' : 'Продолжить'}/>
        </form>
    )
}

export default React.memo(PasswordRecovery);