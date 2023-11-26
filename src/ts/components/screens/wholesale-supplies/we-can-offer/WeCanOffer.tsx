import React, { FC } from "react";
import styles from './WeCanOffer.module.scss';
import cn from 'classnames'; 

import { useQuery } from "@tanstack/react-query";
import { getWeCanOffer } from "../../../../services/getWeCanOffer";
import { IWeCanOffer } from "../../../../types";
import { useLoading } from "../../../../hooks/useLoading";

const WeCanOffer: FC = () => {
    const { ref, isVisible } = useLoading();
    const { error, isLoading, data } = useQuery<IWeCanOffer[]>(['get-we-can-offer', isVisible], () => isVisible ? getWeCanOffer.getAll() : []);

    if (error) throw new Error(`${error}`);

    return (
        <section className={styles.sec} ref={ref}>
            <h1 className={cn(styles.title, 'titlemain')}>Что мы можем вам предложить:</h1>
            
            { isLoading && <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className="icon_loading"/> }

            <div className={styles.cards}>
                {
                    data && data.length > 0 && data.map((inf: IWeCanOffer) => (
                        <div key={inf.id} className={styles.card}>
                            <div className={styles.pic}><img src={inf.icon} className={styles.icon}/></div>
                            <p className={cn(styles.text, 'textmini')}>{inf.text}</p>
                        </div>
                    )).slice(0, 8)
                }
            </div>
        </section>
    )
}

export default React.memo(WeCanOffer);