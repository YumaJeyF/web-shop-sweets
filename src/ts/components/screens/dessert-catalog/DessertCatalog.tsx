import React, { FC } from "react";
import styles from './DessertCatalog.module.scss';
import cn from "classnames";

import Header from "../../header/Header";
import Footer from "../../footer/Footer";

import { Link } from "react-router-dom";
import { useSetTitle } from "../../../hooks/useSetTitle";

import Links from "./links/Links";
import SliderSets from "./slider-sets/SliderSets";

const DessertCatalog: FC = () => {
    useSetTitle('Каталог десертов');
    
    return (
        <>
            <Header/>
            <main className='main'>
                <section className={styles.title_top}>
                    <Link to={'/'} className={styles.text_link}>Главная</Link>
                    <span>»</span>
                    <p className={styles.filter_color_active}>Каталог десертов</p>
                </section>
                <h1 className={cn(styles.titlemain, styles.title)}>Каталог десертов</h1>
                <section>
                    <Links/>
                    <SliderSets/>
                </section>
            </main>
            <Footer/>
        </>   
    )
}

export default React.memo(DessertCatalog);