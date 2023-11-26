import React, { FC, useState } from "react";
import styles from './Login.module.scss';
import cn from 'classnames';
import '../Authorization.scss';

import BtnClose from "../../../ui/btn-close/BtnClose";
import Fields from "./fields/Fields";
import BtnAuthorization from "../../../ui/btn-authorization/BtnAuthorization";

import { SubmitHandler, useForm } from "react-hook-form";
import { useActions } from "../../../../hooks/useActions";

import { ILoginFields } from "../../../../types";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../../services/getUser";

import { IUser } from "../../../../types";
import { IAuthorization } from "../../../../types";
import { useAppSelector } from "../../../../hooks/useAppSelector";

const Login: FC<IAuthorization> = ({ closeModal, isVisible }) => {
    const { handleSubmit, register, formState: { errors, isValid }, watch } = useForm<ILoginFields>({ mode: 'onChange' });
    const watchObj = watch();

    const { setTextNotify, setUserId, setNameForm, setIsFetch, deleteAllSaveData, setCartItems } = useActions();
    const { userId } = useAppSelector(state => state.user);

    const [ loginData, setLoginData ] = useState<ILoginFields>();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ errorText, setErrorText ] = useState<string>('');
    const [ btnDisabled, setBtnDisabled ] = useState<boolean>(false);
    const [ fetchId, setFetchId ] = useState<number>(0);

    useQuery<IUser | null | string>(['get-user', fetchId], () => {
        if (fetchId !== 0) {
            setLoading(true);
            return getUser.getUserByInf(watchObj.password, watchObj.email);
        }
        else return null;
    },{
        onSuccess(user: IUser | string | null) { 
            setTimeout(() => {
                setLoading(false);

                if (user === 'not found') {
                    setErrorText('Неверный email или пароль');
                    setBtnDisabled(true);
                } else if (user && typeof user !== 'string') {
                    // mutation.mutate();
                    deleteAllSaveData();
                    setUserId(user.personalId);
                    setTextNotify('Вы успешно вошли в аккаунт');
                    setErrorText('');
                    setIsFetch(true);
                    closeModal();
                }
            }, 500);
        }
    });

    const onSubmit: SubmitHandler<ILoginFields> = () => {
        console.log('dsadad')
        setFetchId((prev: number) => prev += 1)
    };

    return (
        <form className={cn(styles.form, 'form_m modal_content', { 'active': isVisible })} onSubmit={handleSubmit(onSubmit)} id="entry-form">
            <BtnClose customClass='btn_close_m' classPath='btn_path_m' onClick={closeModal}/>
            <h1 className={cn(styles.title, 'titlemain')}>Вход</h1>
            
            <Fields register={register} errors={{ email: errors.email?.message, password: errors.password?.message }} btnDisabled={btnDisabled} setBtnDisabled={setBtnDisabled}/>
            <p className={cn(styles.text_pass, 'textmini red')} onClick={() => setNameForm('password-recovery')}>Забыли пароль?</p>
            { errorText !== '' && <p className="textmini red">{errorText}</p> }
            
            <BtnAuthorization loading={loading} customClass={styles.btn} conditionActive={!isValid || btnDisabled} nameBtn="Вход"/>
            <p className={cn(styles.text_q, styles.text_bottom, 'textmini')}>Ещё не зарегистрированы?</p>
            <p className={cn(styles.text_link, styles.text_bottom, 'textmini red')} onClick={() => setNameForm('registration')}>Зарегистрироваться</p>
        </form>
    )
}

export default React.memo(Login);