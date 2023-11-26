import React, { FC, useRef, useState } from 'react';
import styles from './PopularSets.module.scss';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { getSets } from "../../../../services/getSets";
import { ISet } from "../../../../types";
import CardProduct from '../../../ui/card-product/CardProduct';

import { useAppSelector } from '../../../../hooks/useAppSelector';

const PopularSets: FC = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const { page } = useAppSelector(state => state.filterSets);

    const startRange: number = 10;
    const limitProducts: number = 6;

    const { data, error, isLoading } = useQuery(['popular-sets'], () => getSets.getPopularSets(startRange, page, limitProducts), {
        onSuccess: () => setLoading(true)
    });

    if (isLoading) return <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className='icon_loading'/>
    if (error) throw new Error(`${error}`);

    return (
        <section className={styles.popular_sets}>
            <h1 className={`${styles.titlemain} ${styles.title_sets}`}>Популярные наборы</h1>
            <div className={styles.product_catalog}>
            {
                data && data.length > 0 
                
                ? data.map((inf: ISet) => <CardProduct inf={inf} key={inf.id}/>)
                : <div className={styles.not_popular_products}>На данный момент популярных товаров нет</div>
            }
            </div>
            { !loading && <img src='../../../../../img/loading.gif' alt="loading" className={styles.icon_loading}/> }
                    
            <Link to={'/complete-sets'} style={{ textDecoration: 'none' }}><button className={cn(styles.main_button, styles.btn)}>Все праздничные наборы</button></Link>
        </section>
    )
}

export default React.memo(PopularSets);