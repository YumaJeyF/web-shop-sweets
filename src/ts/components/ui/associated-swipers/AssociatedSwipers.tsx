import React, { FC, useState } from 'react';
import { Controller } from 'swiper/modules';
import './AssociatedSwipers.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Swiper as typeSwiper } from 'swiper';

const AssociatedSwipers: FC<{ images: string[] }> = ({ images }) => {
    const [ firstSwiper, setFirstSwiper ] = useState<typeSwiper | null>(null);
    const [ secondSwiper, setSecondSwiper ] = useState<typeSwiper | null>(null);

    return (
        <section className='swipers'>
        <Swiper className='first_swiper'
            loop={true}
            modules={[Controller]}
            onSwiper={setFirstSwiper}
            controller={{ control: secondSwiper }}
        >
            {
                images.length > 0 && images.map((img: string) => (
                    <SwiperSlide key={images.indexOf(img)} style={{ cursor: 'grab' }}>
                        <div className='pic'>
                            <img src={img} alt={`image news №${images.indexOf(img)}`} loading='lazy' className='img'/>
                        </div>
                        <div className="swiper-lazy-preloader"></div>
                    </SwiperSlide>
                ))
            }
        </Swiper>

        <Swiper className='second_swiper'
            loop={true}
            modules={[Controller]}
            onSwiper={setSecondSwiper}
            onClick={(swiper: typeSwiper, e: MouseEvent | TouchEvent | PointerEvent) => firstSwiper?.slideTo(swiper.clickedIndex)}
            controller={{ control: firstSwiper }}
            slidesPerView={4}
            spaceBetween={15}

            breakpoints={{
                730: {
                    spaceBetween: 15
                },
                0: {
                    spaceBetween: 10
                }
            }}
        >
            {
                images.length > 0 && images.map((img: string) => (
                    <SwiperSlide key={images.indexOf(img)} style={{ cursor: 'pointer' }}>
                        <div className='pic'>
                            <img src={img} alt={`image news №${images.indexOf(img)}`} loading='lazy' className='img'/>
                        </div>
                        <div className="swiper-lazy-preloader"></div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
        </section>
    )
}

export default React.memo(AssociatedSwipers);