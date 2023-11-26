import React, { FC } from "react";
import styles from './WeddingSets.module.scss';
import cn from 'classnames';

import { useQuery } from "@tanstack/react-query";
import { getSets } from "../../../../services/getSets";
import { ISet } from "../../../../types";
import { useLoading } from "../../../../hooks/useLoading";

import CardProduct from "../../../ui/card-product/CardProduct";

const WeddingSets: FC = () => {
    const { ref, isVisible } = useLoading();
    const { isLoading, error, data } = useQuery<ISet[]>(['get-wedding-sets', isVisible], () => isVisible ? getSets.getByTheme('Свадьба', 6) : []);

    if (error) throw new Error(`${error}`);

    return (
        <section className={styles.sec} ref={ref}>
            <h1 className={cn('titlemain', styles.title)}>Наборы для свадьбы</h1>
            
            { isLoading && <img src="../../../../../img/loading.gif" className="icon_loading"/>}
            
            <div className='product_catalog '>
                { data && data.length > 0 && data.map((inf: ISet) => <CardProduct inf={inf} key={inf.id}/>) }
            </div>
        </section>
    )
}

export default React.memo(WeddingSets);