import React, { FC } from "react";
import styles from './Content.module.scss';

import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../../../../services/getContacts";

import { IContacts } from "../../../../types";
import { blockContacts } from "../../../../types";

import CardContacts from "./card-contacts/CardContacts";

const Content: FC = () => {
    const { error, isLoading, data } = useQuery<IContacts>(['get-contacts'], () => getContacts.getContactsData());

    if (isLoading) return <img src='../../../../../img/loading.gif' alt="Идёт загрузка..." className={styles.icon_loading}/>
    if (error) throw new Error(`Возникла ошибка при попытке получить данные о контактах (${error})`);

    return (
        <section className={styles.sec_contacts}>
            <div className={styles.pic}>
                <img src={data?.image} alt="picture" className={styles.image}/>
            </div>
            <div>
                <h1 className={styles.title}>Контакты</h1>
                { data && data.dataContacts.length > 0 && data.dataContacts.map((inf: blockContacts) => <CardContacts inf={inf} key={inf.id}/>) }
            </div>
        </section> 
    )
}

export default React.memo(Content);