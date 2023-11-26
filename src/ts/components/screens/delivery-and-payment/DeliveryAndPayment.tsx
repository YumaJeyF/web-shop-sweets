import React, { FC } from "react";
import styles from './DeliveryAndPayment.module.scss';

import { IDeliveryPayment } from "../../../types";
import { Link } from "react-router-dom";

import Header from "../../header/Header";
import BlockFirst from "./block-first/BlockFirst";
import SelfCallAndPayment from "./self-call-and-payment/SelfCallAndPayment";
import Map from "./map/Map";
import Footer from "../../footer/Footer";

import { getDeliveryAndPayment } from "../../../services/getDeliveryAndPayment";
import { useQuery } from "@tanstack/react-query";
import { useSetTitle } from "../../../hooks/useSetTitle";

const DeliveryAndPayment: FC = () => {
    useSetTitle('Доставка и оплата');

    const { error, isLoading, data } = useQuery<IDeliveryPayment>(['get-delivery-and-payment'], () => getDeliveryAndPayment.getAll());

    if (isLoading) return <img src="../../../../img/loading.gif" alt="Идёт загрузка..." className={styles.icon_loading}/>
    if (error) throw new Error(`Возникла ошибка при попытке загрузить данные о доставке и оплате (${error})`);

    return (
        <>
            <Header/>
            <section className={styles.sec_top}>
                <div className={styles.two_sec}>
                    <section className={styles.title_top}>
                        <Link className={styles.text_link} to={'/'}>Главная</Link>
                        <span>»</span>
                        <p className={styles.filter_color_active}>Доставка и оплата</p>
                    </section>
                    { data && <BlockFirst data={data.courierDelivery}/> }
                </div>
            </section>
            <main className="main">
                { data && <SelfCallAndPayment data={data.selfCallAndPayment}/> }
            </main>
            <Map/>
            <Footer/>  
        </>
    )
}

export default React.memo(DeliveryAndPayment);