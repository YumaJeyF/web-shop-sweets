import React, { FC } from "react";
import styles from './Slider.module.scss';
import './Slider.scss';
import cn from "classnames";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import { Link } from "react-router-dom";

import CardProduct from "../card-product/CardProduct";

import { ISet } from "../../../types";

const Slider: FC<{ data: ISet[] | undefined, message: string, nameTitle?: string, isBtn: boolean, customClass?: string }> = ({ data, message, nameTitle, isBtn, customClass }) => {
    return (
        <>
            { nameTitle && <h1 className={cn(styles.titlemain, styles.title_like)}>{nameTitle}</h1> }
            {
                data && data.length > 0
                ?
                <Swiper
                    className={styles.swiper}
                    modules={[Navigation]}
                    spaceBetween={8}
                    slidesPerView={1}
                    navigation
                    breakpoints={{
                        1230: {
                            slidesPerView: 4,
                            spaceBetween: 30
                        },
                        1080: {
                            spaceBetween: 15,
                            slidesPerView: 4
                        },
          
                        790: {
                            spaceBetween: 15,
                            slidesPerView: 3
                        },
                        437: {
                            spaceBetween: 8,
                            slidesPerView: 2
                        },
                        0: {
                            spaceBetween: 8,
                            slidesPerView: 1
                        }
                    }}
                >
                    { data.map((inf: ISet) => <SwiperSlide key={inf.id} onClick={() => window.location.reload()} className={cn({
                        [`${customClass}`]: customClass
                    })}><CardProduct inf={inf} maxPic='220px' isCrossed={true}/></SwiperSlide>) } 
                
                </Swiper>
                :
                <p className={cn(styles.textmiddle)} style={{ textAlign: 'center' }}>{message}</p>
            }

            { isBtn && <Link to={'/complete-sets'} style={{ textDecoration: 'none' }}><button className={cn(styles.btn, styles.main_button)}>Все готовые наборы</button></Link> }
        </>
    )
}

export default React.memo(Slider);