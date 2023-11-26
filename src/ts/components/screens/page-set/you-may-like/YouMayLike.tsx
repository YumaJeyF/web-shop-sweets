import React, { FC } from 'react';
import styles from './YouMayLike.module.scss';

import 'swiper/scss';
import 'swiper/scss/navigation';

import { useQuery } from '@tanstack/react-query';
import { getSets } from '../../../../services/getSets';
import { useLoading } from '../../../../hooks/useLoading';

import Slider from '../../../ui/slider/Slider';

const YouMayLike: FC<{ themes: string[], id: number, type: string }> = ({ themes, id, type }) => {
    const { ref, isVisible } = useLoading();

    const { data, error, isLoading } = useQuery(['data-you-like', isVisible], () => isVisible ? getSets.getYouLike(themes, 20, id, type) : []);

    if (isLoading) return <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className='icon_loading'/>
    if (error) throw new Error(`${error}`);

    return (
        <section className={styles.sec_like} ref={ref}>
            <Slider data={data} message='Похожих товаров нет' nameTitle='Вам могут понравиться' isBtn={true}/>
        </section>
    )
}

export default React.memo(YouMayLike);