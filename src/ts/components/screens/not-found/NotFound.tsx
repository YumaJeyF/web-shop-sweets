import React, { FC } from "react";
import styles from './NotFound.module.scss';
import cn from 'classnames';

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getImagesNotFound } from '../../../services/getImagesNotFound';
import { useSetTitle } from "../../../hooks/useSetTitle";

import Header from "../../header/Header";
import Footer from "../../footer/Footer";

type ImagesNotFound = {
    day: string
    night: string
    backgroundNight: string
}

const NotFound: FC = () => {
    useSetTitle('Не найдено');

    const { data: images, isLoading, error } = useQuery<ImagesNotFound>(['get-not-found'], () => getImagesNotFound());
    const currentHour: number = new Date().getHours();
    const isNight: boolean = currentHour >= 10;
    const navigate = useNavigate();

    if (isLoading) return <img src="../../../../img/loading.gif" alt="Идёт загрузка..." className="icon_loading"/>
    if (error) throw new Error(`${error}`);
    
    return (
        <>
            <Header/>
            <main className={styles.sec} style={{ backgroundImage: isNight && images ? `url('${images.backgroundNight}')` : '' }}>
                <p className={cn(styles.title)} style={{ color: isNight ? '#fff' : '' }}>Извините, страница не найдена</p>
                <div className={styles.pic}>
                    <img src={images && (isNight ? images.night : images.day)} className={styles.image}/>
                </div>
                <button className={cn(styles.btn, 'main_button')} style={{
                    borderColor: isNight ? '#4E9DD3' : '#E7426A',
                    color: isNight ? '#fff' : '#E7426A'
                }} onClick={() => navigate(-1)}>Назад</button>
            </main>
            <Footer/>
        </>
    )
}
export default React.memo(NotFound);