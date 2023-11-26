import React, { FC } from "react";
import styles from './Contacts.module.scss';

import Header from "../../header/Header";
import Content from "./content/Content";
import Footer from "../../footer/Footer";

import { Link } from "react-router-dom";
import { useSetTitle } from "../../../hooks/useSetTitle";

const Contacts: FC = () => {
    useSetTitle('Контакты');

    return (
        <>
            <Header/>
            <main className="main">
                <section className={styles.title_top}>
                    <Link className={styles.text_link} to={'/'}>Главная</Link>
                    <span>»</span>
                    <p className={styles.filter_color_active}>Контакты</p>
                </section>
                <Content/>
            </main>
            <Footer/>  
        </>
    )
}

export default React.memo(Contacts);