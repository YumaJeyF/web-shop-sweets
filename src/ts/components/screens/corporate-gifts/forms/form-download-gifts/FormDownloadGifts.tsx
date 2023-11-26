import React, { FC, useEffect, useState } from "react";
import styles from '../Forms.module.scss';
import cn from 'classnames';

import { useForm, SubmitHandler } from "react-hook-form";
import { useClickOutside } from "../../../../../hooks/useClickOutside";
import { IFieldsCorporateGifts } from "../../../../../types";

import AgreementWithContract from "../../../../ui/agreement-with-contract/AgreementWithContract";
import BtnClose from "../../../../ui/btn-close/BtnClose";
import LoadingForm from "../../../../ui/loading-form/LoadingForm";
import Fields from "./fields/Fields";

const FormDownloadGifts: FC<{ isVisible: boolean, closeModal: () => void }> = ({ isVisible, closeModal }) => {
    const { register, handleSubmit, reset, formState: { isValid, errors }, trigger, watch, setValue } = useForm<IFieldsCorporateGifts>({mode: 'onChange'});
    const watchObj = watch();
    const [ postData, setPostData ] = useState<boolean>(false);
    const [ isChange, setIsChange ] = useState<boolean>(false);

    useClickOutside('#form-d-g', 'active', () => closeModal(), '#btn-c-gifts');

    const onSubmit: SubmitHandler<IFieldsCorporateGifts> = (data): void => {
        if (sessionStorage.getItem('dowloadGiftsValues')) sessionStorage.removeItem('dowloadGiftsValues');
        
        reset();
    }

    useEffect(() => {
        if (sessionStorage.getItem('dowloadGiftsForm')) {
            const saveData: IFieldsCorporateGifts = JSON.parse(String(sessionStorage.getItem('dowloadGiftsValues')));

            if (saveData) {
                setValue('name', saveData.name);
                setValue('phone', saveData.phone);
                setValue('company', saveData.company);
                setValue('email', saveData.email);
                
                if (saveData.comment) setValue('comment', saveData.comment);

                trigger();
            }
        }
    }, []);

    useEffect(() => {
        if (isChange) sessionStorage.setItem('dowloadGiftsValues', JSON.stringify(watchObj));
    }, [ watchObj ]);

    return (
        <div className={cn(styles.modal_container, 'modal_c_default', { 'modal_c_default_active': isVisible })}>
            <form className={cn(styles.form, 'modal_content', { 'active': isVisible })} id="form-d-g" onSubmit={handleSubmit(onSubmit)} >
                <h1 className={cn(styles.title, 'titlemain')}>Скачать весь каталог подарков</h1>
                <BtnClose customClass={styles.btn_close} classPath={styles.icon} onClick={() => closeModal()}/>
                <LoadingForm postData={postData} backColor="#F7EBE5"/>
                <Fields
                    register={register}
                    errorsMessages={{
                        errName: errors.name?.message,
                        errCompany: errors.company?.message,
                        errEmail: errors.email?.message,
                        errPhone: errors.phone?.message,
                    }}
                    setIsChange={setIsChange}
                />
                <button className={cn(styles.btn, 'textmini red_btn_form', { 'red_btn_form_disabled': !isValid })}>Отправить заявку</button>
                <AgreementWithContract/>
            </form>
        </div>
    )
}

export default React.memo(FormDownloadGifts);