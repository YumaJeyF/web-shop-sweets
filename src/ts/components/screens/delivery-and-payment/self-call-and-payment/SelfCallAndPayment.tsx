import React, { FC } from "react";
import styles from './SelfCallAndPayment.module.scss';

import { ISelfCallAndPayment } from "../../../../types";
import BlockInf from "../block-inf/BlockInf";

const SelfCallAndPayment: FC<{ data: ISelfCallAndPayment }> = ({ data }) => {
    return (
        <section className={styles.sec_middle}>
            <section className={styles.left_inf}>
                <BlockInf texts={data.textsSelfCall} nameTitle="Самовызов"/>
                <BlockInf texts={data.textsPayment} nameTitle="Оплата"/>
            </section>
            <div className={styles.pic}>
                <img src={data.image} className={styles.image}/>
            </div>
        </section>
    )
}

export default React.memo(SelfCallAndPayment);