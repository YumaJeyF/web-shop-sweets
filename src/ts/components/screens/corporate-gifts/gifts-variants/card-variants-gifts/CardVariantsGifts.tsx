import React, { FC } from "react";
import styles from './CardVariantsGifts.module.scss';
import cn from 'classnames';

import LoadableImage from "../../../../ui/LoadableImage/LoadableImage";
import { IVariantsGifts } from "../../../../../types";

const CardVariantsGifts: FC<{ inf: IVariantsGifts }> = ({ inf }) => {
    return (
        <div className={styles.card}>
            <div className={styles.pic}>
                <LoadableImage src={inf.image}/>
            </div>
            <div className={styles.block_inf}>
                <h2 className={cn('textvmiddle_bold', styles.name)}>{inf.name}</h2>
                <p className={cn('textmini', styles.text)}>{inf.text}</p>
            </div>
            <p className={cn('textvmiddle_bold red', styles.price)}>{inf.price} руб.</p>
        </div>
    )
}

export default React.memo(CardVariantsGifts);