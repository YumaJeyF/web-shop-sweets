import React, { FC } from "react";
import styles from './BlockFirst.module.scss';

import { ICourierDelivery } from "../../../../types";
import { useChangeSizeWindow } from "../../../../hooks/useChangeSizeWindow";

import BlockInf from "../block-inf/BlockInf";
import Cap from "./cap/Cap";

const BlockFirst: FC<{ data: ICourierDelivery }> = ({ data }) => {
    const size = useChangeSizeWindow();

    return (
        <section className={styles.block_first}>
            { size <= 768 && <Cap/> }
            <div className={styles.pic}>
                <img src={size > 768 ? data.imageDesktop : data.imageMobile} className={styles.pic_image}/>
            </div>

            <div className={styles.delivery_inf}>
                <BlockInf texts={data.texts} isCourierDelivery={true} linkLocationNumber={data.linkLocationNumber} nameTitle="Курьерская доставка"/>
            </div>
        </section>
    )
}

export default React.memo(BlockFirst);