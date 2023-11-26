import React, { FC } from 'react';
import styles from './Company.module.scss';
import cn from 'classnames';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import './Company.scss';

import { useQuery } from '@tanstack/react-query';
import { getCompany } from '../../../services/getCompany';
import { useLoading } from '../../../hooks/useLoading';

import { ICompany } from '../../../types';

const Company: FC<{ classForSection?: string }> = ({ classForSection }) => {
    const { ref, isVisible } = useLoading();
    const { data, error, isLoading } = useQuery<ICompany[]>(['company', isVisible], () => isVisible ? getCompany.getAll() : []);

    if (error) throw new Error(`Возникла ошибка при попытке получения картинок компаний (${error})`);

    return (
        <section className={cn(styles.sec, 'sec-company-swiper', {
            [`${classForSection}`]: classForSection
        })} ref={ref}>
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={67}
                slidesPerView={6}
                slidesPerGroup={6}
                pagination={{
                    clickable: true,
                    type: data && data.length > 18 ? 'fraction' : 'bullets'
                }}
                loop={true}
                speed={500}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false
                }}
                breakpoints={{ 
                    993: {
                        spaceBetween: 67,
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                        pagination: {
                            type: 'bullets'
                        }
                    },
                    801: {
                        spaceBetween: 30,
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                        pagination: {
                            type: 'bullets'
                        }
                    },
                    741: {
                        spaceBetween: 15,
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                        pagination: {
                            type: 'bullets'
                        }
                    },
                    500: {
                        spaceBetween: 15,
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        pagination: {
                            type: 'fraction'
                        }
                    },
                    310: {
                        spaceBetween: 8,
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        pagination: {
                            type: 'fraction'
                        }
                    },
                    0: {
                        spaceBetween: 8,
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        pagination: {
                            type: 'fraction'
                        }
                    }
                }}
            >
                { isLoading && <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className={styles.icon_loading}/> }
                { data && data.length > 0 && data.map((inf: ICompany) =>  (
                    <SwiperSlide key={inf.id}>
                        <div className={styles.pic}><img src={inf.image} alt={inf.name} className={styles.image}/></div>
                    </SwiperSlide>
                )) }
            </Swiper>
        </section>
    )
}

export default React.memo(Company);