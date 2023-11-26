import React, { FC, useState } from "react";
import styles from './Registration.module.scss';
import cn from 'classnames';

import '../Authorization.scss';

import { SubmitHandler, useForm } from "react-hook-form";
import { useActions } from "../../../../hooks/useActions";

import Fields from "./fields/Fields";
import BtnClose from "../../../ui/btn-close/BtnClose";
import BtnAuthorization from "../../../ui/btn-authorization/BtnAuthorization";
import AgreementWithContract from "../../../ui/agreement-with-contract/AgreementWithContract";

import { IRegistrationFields } from "../../../../types";

import { useMutation } from "@tanstack/react-query";
import { useChangeSizeWindow } from "../../../../hooks/useChangeSizeWindow";

import { postAuthorizationData } from "../../../../services/postAuthorizationData";

import { IUser } from "../../../../types";
import { IAuthorization } from "../../../../types";
import { nanoid } from "@reduxjs/toolkit";

const Registration: FC<IAuthorization> = ({ closeModal, isVisible }) => {
    const { register, handleSubmit, formState: { errors, isValid }, setError, watch } = useForm<IRegistrationFields>({ mode: 'onChange' });
    const { setNameForm, setTextNotify } = useActions();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ btnDisabled, setBtnDisabled ] = useState<boolean>(false);
    const size = useChangeSizeWindow();
    const objWatch = watch();
    
    const mutations = useMutation(
        (data: IUser) => {
            setLoading(true);
            return postAuthorizationData.postRegData(data);
        },
        {
            onSuccess() {
                setTimeout(() => {
                    setLoading(false);
                    setNameForm('login');
                    setTextNotify('Вы успешно зарегистрировались, теперь вы можете войти в аккаунт');
                }, 500);
            }
        }
    );
    
    const onSubmit: SubmitHandler<IRegistrationFields> = (data) => mutations.mutate({
        personalId: nanoid(),
        name: data.name,
        phoneNumber: data.tel,
        email: data.email,
        city: data.city,
        nameCompany: data.company,
        password: data.password,
        cart: [],
        promoCodesUsed: []
    })

    return (
        <form className={cn(styles.form, 'form_m modal_content', { 'active': isVisible })} onSubmit={handleSubmit(onSubmit)} id="entry-form">
            <div className={styles.block_title}>
                <h1 className={cn(styles.title, 'titlemain')}>Получите доступ к оптовым ценам</h1>
                <p className={cn(styles.text_need, 'textvmiddle_bold')}>Пройдите регистрацию</p>
            </div>
            <BtnClose customClass='btn_close_m' classPath='btn_path_m' onClick={closeModal}/>

            <Fields
                register={register} 
                setError={setError}
                setBtnDisabled={setBtnDisabled}
                errors={{
                    name: errors.name?.message,
                    tel: errors.tel?.message,
                    email: errors.email?.message,
                    city: errors.city?.message,
                    company: errors.company?.message,
                    password: errors.password?.message
                }}
                values={{
                    email: objWatch.email,
                    tel: objWatch.tel
                }}
            />
            <BtnAuthorization
                loading={loading}
                customClass={styles.btn}
                conditionActive={!isValid || btnDisabled}
                nameBtn={size > 540 ? 'Отправить заявку на регистрацию' : 'Зарегистрироваться'}
            />
            <p className={cn(styles.text_q, 'textmini')}>Уже зарегистрированы? <strong className={cn(styles.text_login, 'textmini red')} onClick={() => setNameForm('login')}>Войти</strong></p>
            <AgreementWithContract/>          
        </form>
    )
}

export default React.memo(Registration);