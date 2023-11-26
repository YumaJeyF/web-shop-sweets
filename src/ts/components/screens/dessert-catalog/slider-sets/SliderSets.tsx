import React, { FC } from "react";
import styles from './SliderSets.module.scss';
import cn from 'classnames';

import { useQuery } from "@tanstack/react-query";
import Slider from "../../../ui/slider/Slider";

import { getSets } from "../../../../services/getSets";
import { ISet } from "../../../../types";
import { useLoading } from '../../../../hooks/useLoading';

const SliderSets: FC = () => {
    const { ref, isVisible } = useLoading();

    const { isLoading, error, data } = useQuery<ISet[]>(['sets-for-dessert-page', isVisible], () => isVisible ? getSets.getComboSetsWithLimit(40) : []);

    if (isLoading) return <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className={styles.icon_loading}/>
    if (error) throw new Error(`Возникла ошибка при попытке загрузить данные о готовых наборах (${error})`);

    return (
        <section className={styles.slider} ref={ref}>
            <h1 className={cn(styles.titlemain, styles.title)}>Хотите попробовать всё сразу?</h1>
            <p className={cn(styles.textvmiddle, styles.text)}>Тогда взгляните на наши комбо-наборы</p>
            { data && <Slider data={data} message="Готовые наборы не были найдены" isBtn={true}/> }
        </section>
    )
}

export default React.memo(SliderSets);