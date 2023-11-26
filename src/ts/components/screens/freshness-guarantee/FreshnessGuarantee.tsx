import React, { FC } from "react";
import styles from './FreshnessGuarantee.module.scss';
import cn from 'classnames';

import { Link } from "react-router-dom";
import { useSetTitle } from "../../../hooks/useSetTitle";

import Header from "../../header/Header";
import BlockGuarantee from "./block-guarantee/BlockGuarantee";
import Footer from "../../footer/Footer";

const FreshnessGuarantee: FC = () => {
    useSetTitle('Гарантии вкуса и качества');

    return (
        <>
            <Header/>
            <main className="main">
                <section className={styles.title_top}>
                    <Link className={styles.text_link} to='/'>Главная</Link>
                    <span>»</span>
                    <p className={styles.filter_color_active}>Гарантии вкуса и качества</p>
                </section>
                <section className={styles.sec_inf}>
                    <h1 className={cn(styles.titlemain, styles.title)}>Гарантии вкуса и качества</h1>
                    <p className={cn(styles.text, styles.textmain)}>При изготовлении пирожных мы используем только натуральные ингредиенты, избегая использования конвер</p>
                    <BlockGuarantee/>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default React.memo(FreshnessGuarantee);