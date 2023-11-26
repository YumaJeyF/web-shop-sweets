import React, { FC, useRef } from 'react';
import styles from './TakingCareOfYou.module.scss';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';

import { getTakingCareData } from '../../../../services/getTakingCareData';
import TakingCareInf from './taking-care-inf/TakingCareInf';

export interface ITakingCare {
    id: number
    image: string
    name: string
    text: string
}

const TakingCareOfYou: FC = () => {
    const { data, isLoading, error } = useQuery<ITakingCare[]>(['care-data'], () =>  getTakingCareData());

    if (isLoading) return <img src="../../.././../../img/loading.gif" alt="Идёт загрузка..." className='icon_loading'/>;
    if (error) throw new Error(`${error}`);

    return (
        <section className={styles.care_sec} id='taking-care'>
            <h1 className={cn(styles.title, 'titlemain')}>Мы обо всём позаботились</h1>

            <div className={styles.container_inf}>
                { data && data.length > 0 && data.map((inf: ITakingCare) => <TakingCareInf inf={inf} key={inf.id}/>) }
            </div>
        </section>
    )
}

export default React.memo(TakingCareOfYou);