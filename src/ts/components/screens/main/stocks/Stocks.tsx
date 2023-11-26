import React, { FC, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useQuery } from "@tanstack/react-query";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Stocks.module.scss';
import './../../../../../scss/_style-pagination-swiper.scss';

import { IStocks } from "../../../../types";
import { getStocks } from "../../../../services/getStocks";

import StockSlide from './stock-slide/StockSlide';

const Stocks: FC = () => {
    const { data, error, isLoading } = useQuery<IStocks[]>(['stocks'], () => getStocks.getAll());

    if (isLoading) return <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className='icon_loading'/>
    if (error) throw new Error(`${error}`);

    return (
        <section className={styles.stocks} id='stocks'>
            <h1 className={cn('titlemain', styles.stocks_title)}>Акции</h1>
            <Swiper className='stock_swiper'
                modules={[Pagination]}
                spaceBetween={30}
                slidesPerView={4}
                slidesPerGroup={4}
                loop={true}
                pagination={{ 
                    clickable: true
                }}

                breakpoints={{
                    1202: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                        slidesPerGroup: 4
                    },
                    780: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                        slidesPerGroup: 3,
                        pagination: {
                            type: 'bullets'
                    }
                    },
                    500: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        pagination: {
                            type: 'fraction'
                    }
                    },
                    0: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        pagination: {
                            type: 'fraction'
                        }
                    }
                }}
            >
                {
                    data && data.map((data: IStocks) => (
                        <SwiperSlide key={data.id}>
                            <StockSlide data={data}/>
                            <div className="swiper-lazy-preloader"></div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    )
}

export default React.memo(Stocks);