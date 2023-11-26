import React, { FC } from "react";
import styles from './AddToOrder.module.scss';

import Slider from "../../../ui/slider/Slider";

import { useQuery } from "@tanstack/react-query";
import { getSets } from "../../../../services/getSets";
import { useLoading } from "../../../../hooks/useLoading";

const AddToOrder: FC = () => {
    const { ref, isVisible } = useLoading();
    const { data, error, isLoading } = useQuery(['get-sets', isVisible], () => isVisible ? getSets.getSetsWithLimit(40) : []);
    
    if (isLoading) return <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className='icon_loading'/>
    if (error) throw new Error(`${error}`);

    return (
        <section className={styles.sec_set_order} ref={ref}>
            <Slider data={data} message="Товаров нет" nameTitle="Добавить в заказ" isBtn={false}/>
        </section>
    )
}

export default React.memo(AddToOrder);