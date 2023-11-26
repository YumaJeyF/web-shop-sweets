import React, { FC, useEffect, useState } from "react";
import styles from './FormIdeas.module.scss';
import cn from 'classnames';

import { IFieldsFormIdeas } from "../../../../types";

import { SubmitHandler, useForm } from "react-hook-form";
import { useChangeSizeWindow } from "../../../../hooks/useChangeSizeWindow";
import { useQuery } from "@tanstack/react-query";
import { getBackImagesFormIdeas } from "../../../../services/getBackImagesFormIdeas";

import BlocksFields from "./blocks-fields/BlocksFields";
import AgreementWithContract from "../../../ui/agreement-with-contract/AgreementWithContract";
import LoadingForm from "../../../ui/loading-form/LoadingForm";

const FormIdeas: FC = () => {
    const [ isChange, setIsChange ] = useState<boolean>(false);
    const [ postData, setPostData ] = useState<boolean>(false);
    const { watch, handleSubmit, register, formState: { errors, isValid }, setValue, trigger, reset } = useForm<IFieldsFormIdeas>({ mode: 'onChange' });
    const { error, data } = useQuery<{ imageDesktop: string, imageMobile: string }>(['get-back-image'], () => getBackImagesFormIdeas());
    const objWatch = watch();
    const size = useChangeSizeWindow();

    if (error) throw new Error(`${error}`);

    const onSubmit: SubmitHandler<IFieldsFormIdeas> = (data) => {
        if (sessionStorage.getItem('dataFormIdeas')) {
            sessionStorage.removeItem('dataFormIdeas');
            reset();
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('dataFormIdeas')) {
            const saveData: IFieldsFormIdeas = JSON.parse(String(sessionStorage.getItem('dataFormIdeas')));

            if (saveData) {
                setValue('name', saveData.name);
                setValue('telephone', saveData.telephone);
                setValue('proposal', saveData.proposal);

                trigger();
            }
        }
    }, []);

    useEffect(() => {
        if (isChange) sessionStorage.setItem('dataFormIdeas', JSON.stringify(objWatch));
    }, [objWatch]);

    return (
        <section className={styles.sec} style={{ backgroundImage: data && `url(${size > 400 ? data.imageDesktop : data.imageMobile})` }}>
            <div className={styles.content}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <LoadingForm backColor="#F1F1F1" postData={postData}/>
                    <h1 className={cn(styles.title, 'titlemain')}>Мы открыты для новых идей</h1>
                    <p className={cn(styles.text, 'textvmiddle')}>Каждое событие уникально и мы готовы предложить индивидуальные решения для Вашего мероптиятия</p>

                   <BlocksFields 
                        register={register}
                        errors={{
                            name: errors.name?.message,
                            telephone: errors.telephone?.message,
                            proposal: errors.proposal?.message
                        }}
                        setIsChange={setIsChange}
                    />

                    <button className={cn(styles.btn, 'red_btn_form', { 'red_btn_form_disabled': !isValid })}>Отправить заявку</button>
                    <AgreementWithContract/>
            </form>
            </div>
        </section>
    )
}

export default React.memo(FormIdeas)