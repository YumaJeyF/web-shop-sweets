import React, { FC } from "react";
import styles from './CompletedOrders.module.scss';
import cn from 'classnames';

import { useQuery } from "@tanstack/react-query";
import { getCompletedOrders } from "../../../../services/getCompletedOrders";
import { ICompletedOrder } from "../../../../types";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper/modules";
import { useLoading } from "../../../../hooks/useLoading";

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import './CompletedOrder.scss';

import CardOrder from "./card-order/CardOrder";

const CompletedOrders: FC = () => {
    const { ref, isVisible } = useLoading();
    const { error, isLoading, data } = useQuery<ICompletedOrder[]>(['completed-orders', isVisible], () => isVisible ? getCompletedOrders.getAll() : []);

    if (error) throw new Error(`Возникла ошибка при попытке получения данных о выполненных заказах (${error})`);

    return (
        <section className={cn(styles.sec, 'sec-complete-orders')} ref={ref}>
            <h1 className={cn(styles.titlemain, styles.title)}>Мы уже выполнили заказы</h1>

            <Swiper
                className={styles.slider}
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={4}
                slidesPerGroup={4}
                loop={true}
                speed={500}
                pagination={{
                    clickable: true,
                    type: data && data.length > 12 ? 'fraction' : 'bullets'
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    991: {
                        spaceBetween: 30
                    },
                    851: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        pagination: {
                            type: 'bullets'
                        }
                    }, 
                    641: {
                        spaceBetween: 20,
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        pagination: {
                            type: 'fraction'
                        }
                    },
                    611: {
                        spaceBetween: 15,
                        slidesPerGroup: 3,
                        slidesPerView: 3,
                        pagination: {
                            type: 'fraction'
                        }
                    },
                    396: {
                        slidesPerGroup: 2,
                        slidesPerView: 2,
                        pagination: {
                            type: 'fraction'
                        }
                    },
                    0: {
                        spaceBetween: 8,
                        slidesPerGroup: 1,
                        slidesPerView: 1,
                        pagination: {
                            type: 'fraction'
                        }
                    }
                }}
            >
                { isLoading && <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className={styles.icon_loading}/> }
                { data && data.length > 0 && data.map((inf: ICompletedOrder) => <SwiperSlide key={inf.id}><CardOrder inf={inf}/></SwiperSlide>) }
            </Swiper>

        </section>
    )
}

export default React.memo(CompletedOrders);