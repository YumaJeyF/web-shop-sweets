import React, { FC } from "react";
import styles from './Price.module.scss';
import cn from 'classnames';

const Price: FC<{ titleName: string, price: number }> = ({ titleName, price }) => {
    return (
        <div className={styles.prices_inf}>
            <p className={cn(styles.textmiddle, styles.res_text)}>{titleName}</p>
            <span className={styles.dashed_line}></span>
            <p className={cn(styles.textmiddle, styles.price)}>{price} руб</p>
        </div>
    )
}

export default React.memo(Price);