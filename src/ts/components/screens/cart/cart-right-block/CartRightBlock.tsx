import React, { FC, useEffect, useState } from "react";
import styles from './CartRightBlock.module.scss';
import cn from 'classnames';

import Prices from "./prices/Prices";
import Promo from "../../../ui/promo/Promo";

import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useActions } from "../../../../hooks/useActions";
import { useChangeSizeWindow } from "../../../../hooks/useChangeSizeWindow";
import { calcResultPrice } from "../../../../functions/calcResultPrice";
import { useMutation } from "@tanstack/react-query";
import { IOrder } from "../../../../types";
import { changeCart } from "../../../../services/changeCart";
import { useNavigate } from "react-router-dom";

const CartRightBlock: FC = () => {
    const { dataDelivery, cartItems, resultPriceOrder } = useAppSelector(state => state.cart);
    const { setIsClickArrange, removeDiscountPromo, deleteAllSaveData, setIsLoading } = useActions();
    const size = useChangeSizeWindow();
    const resultPrice: number = calcResultPrice(cartItems);
    const navigate = useNavigate();

    const mutation = useMutation((order: IOrder) => changeCart.postOrder(order), { onSuccess() { 
        setTimeout(() => {
            setIsLoading(false);
            
        }, 1000);
    }});

    const makingAnOrder = () => {
        if (dataDelivery != '' && cartItems) {
            setIsLoading(true);
            mutation.mutate({
                name: dataDelivery.name,
                phone: dataDelivery.phone,
                address: dataDelivery.address,
                message: dataDelivery.message,
                methodPayment: dataDelivery.methodPayment,
                deliveryMethod: dataDelivery.deliveryMethod,
                time: dataDelivery.time,
                date: dataDelivery.date,
                products: cartItems,
                price: resultPrice,
                orderDate: (new Date).toLocaleDateString(),
                status: 'Ожидание'
            });

            if (localStorage.getItem('saveDataFormDelivery')) localStorage.removeItem('saveDataFormDelivery');
            if (localStorage.getItem('deliveryId')) localStorage.removeItem('deliveryId');
            if (localStorage.getItem('idCheck')) localStorage.removeItem('idCheck');
            if (localStorage.getItem('data-is-added')) localStorage.removeItem('data-is-added');
            
            removeDiscountPromo(true);
            setIsClickArrange(true);
            deleteAllSaveData();
            
            navigate('/probability-to-recommend');
        }
    }

    return (
        <section className={styles.sec_right}>
            <div className={styles.content}>
                <h1 className={cn(styles.textvmiddle_bold, styles.title)}>Итого</h1>
                <Prices/>
                <div className={styles.result_price}>
                    <p className={cn(styles.textmiddle, styles.res_text)}>К оплате</p>
                    <p className={cn(styles.textvmiddle_bold, styles.price)}>{resultPrice} руб</p>
                </div>
                { size > 930 && <Promo/> }
                <button className={cn(styles.textmini, styles.btn_arrange, 'red_btn_form', {
                    'red_btn_form_disabled': dataDelivery === ''
                })} onClick={makingAnOrder}>Оформить заказ</button>
            </div>
        </section>
    )
}

export default React.memo(CartRightBlock);