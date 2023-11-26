import React, { FC, useState } from "react";
import styles from './GiftsVariants.module.scss';
import cn from 'classnames';

import { useQuery } from "@tanstack/react-query";
import CardVariantsGifts from "./card-variants-gifts/CardVariantsGifts";
import FormPaymentOrder from "../forms/form-payment-order/FormPaymentOrder";
import { getVariantsGifts } from "../../../../services/getVariantsGifts";
import { IVariantsGifts } from "../../../../types";

import { useModal } from "../../../../hooks/useModal";
import { useOpenSaveModal } from "../../../../hooks/useOpenSaveModal";
import { useLoading } from "../../../../hooks/useLoading";

const GiftsVariants: FC = () => {
    const { ref, isVisible: inView } = useLoading();
    const { error, data, isLoading } = useQuery<IVariantsGifts[]>(['variants-gifts', inView], () => inView ? getVariantsGifts.getAll() : []);
    const [ isVisible, setIsVisible ] = useState<boolean>(sessionStorage.getItem('getCorporateGiftsForm') ? true : false);

    const { openModal, closeModal } = useOpenSaveModal('getCorporateGiftsForm', setIsVisible);
    
    useModal(isVisible);

    if (error) throw new Error(`Возникла ошибка при попытке получить данные о вариантах подарков (${error})`);

    return (
        <section className={styles.sec} ref={ref}>
            <h1 className={cn(styles.titlemain, styles.title)}>Некоторые варианты подарков</h1>

            <div className={cn(styles.catalog)}>
                { isLoading && <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className={styles.icon_loading}/> }
                { data && data.length > 0 && data.map((inf: IVariantsGifts) => <CardVariantsGifts key={inf.id} inf={inf}/>).slice(0, 4) }
            </div>

            <FormPaymentOrder isVisible={isVisible} closeModal={closeModal}/>

            <button className={cn(styles.btn, styles.textmini)} onClick={openModal} id="btn-form-p-o">Получить КП</button>
        </section>
    )
}

export default React.memo(GiftsVariants);