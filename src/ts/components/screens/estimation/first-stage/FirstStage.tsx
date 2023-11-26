import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styles from './FirstStage.module.scss';
import cn from 'classnames';

import { useForm, SubmitHandler } from "react-hook-form";

import CardProblem from './card-problem/CardProblem';
import MiddleInf from "./middle-inf/MiddleInf";
import FieldPhone from './field-phone/FieldPhone';
import FieldComment from './field-comment/FieldComment';
import LoadingForm from "../../../ui/loading-form/LoadingForm";
import AgreementWithContract from '../../../ui/agreement-with-contract/AgreementWithContract';

export interface IFieldsSecondStage {
    problem: string[]
    comment: string
    phone: number
}

const examplesOfProblems = ['Приём заказа', 'Доставка', 'Упаковка', 'Вкус продукции']

const FirstStage: FC<{ setStageNumber: Dispatch<SetStateAction<number>> }> = ({ setStageNumber }) => {
    const { handleSubmit, register, formState: { isValid, errors }, watch, setValue, trigger } = useForm<IFieldsSecondStage>({ mode: "onChange" });
    const objWatch = watch();
    const [ isPostData, setIsPostData ] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('formDataEstimation')) {
            const saveData: IFieldsSecondStage = JSON.parse(String(localStorage.getItem('formDataEstimation')));

            if (saveData) {
                setValue('comment', saveData.comment);
                setValue('problem', saveData.problem);
                setValue('phone', saveData.phone);

                trigger();
            }
        }
    }, []);

    useEffect(() => {
        if (JSON.stringify(objWatch) !== JSON.stringify({})) localStorage.setItem('formDataEstimation', JSON.stringify(objWatch));
    }, [ objWatch ]);

    const onSubmit: SubmitHandler<IFieldsSecondStage> = (data) => {
        setStageNumber(2);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <LoadingForm postData={isPostData} backColor="#F7F7F7"/>
            <h1 className='titlebig title-estimation'>Оцените нас</h1>
            <p className={cn(styles.text, 'textvmiddle_bold')}>Что Вам не понравилось?</p>

            <div className={styles.problems}>
                { examplesOfProblems.length > 0 && examplesOfProblems.map((problem: string, index: number) => <CardProblem key={index} register={register} index={index} problem={problem}/>) }
                { errors.problem?.message && <p className="inp_f_er">{errors.problem.message}</p> }
            </div>
            <MiddleInf/>
            <FieldComment register={register} error={errors.comment?.message}/>
            <div className={styles.bottom}>
                <label className='inp_n_f'>Ваш телефон</label>

                <div className={styles.bottom_inf}>
                    <FieldPhone register={register} error={errors.phone?.message}/>
                    <button className={cn(styles.btn, 'red_btn_form', { 'red_btn_form_disabled': !isValid })}>Отправить</button>
                </div>
                { errors.phone?.message && <p className="inp_f_er">{errors.phone.message}</p> }
            </div>
            <AgreementWithContract/>
        </form>
    )
}

export default React.memo(FirstStage);