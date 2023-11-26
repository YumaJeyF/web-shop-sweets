import React, { FC } from 'react';
import styles from '../NewsOnMainPage.module.scss';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../../../../../scss/_style-pagination-swiper.scss';
import cn from 'classnames';

import { INews } from '../../../../../types';
import CardNews from '../../../News/card-news/CardNews';

const SwiperNews: FC<{ data: INews[] }> = ({ data }) => {

    return (
        <Swiper className={cn(styles.swiper_news, 'swiper_news')}
        modules={[Pagination]}
        loop={true}
        spaceBetween={30}
        slidesPerGroup={3}
        pagination={{ 
            clickable: true,
        }}
        breakpoints={{
            836: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 30
            },
            540: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 15,
                pagination: {
                    type: 'bullets'
                }
            },
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 15,
                pagination: {
                    type: 'fraction'
                }
            }
        }}
    >
        {
            data && data.length > 0 &&

            data.map((inf: INews) => (
                <SwiperSlide key={inf.id}>
                    <CardNews inf={inf}/>
                </SwiperSlide>
            ))
        }

        </Swiper>
    )
}

export default React.memo(SwiperNews);