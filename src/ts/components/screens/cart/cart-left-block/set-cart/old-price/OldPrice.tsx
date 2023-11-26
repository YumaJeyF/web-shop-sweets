import React, { FC } from "react";
import styles from './oldPrice.module.scss';
import cn from 'classnames';

const OldPrice: FC<{ oldPrice: number, count: number }> = ({ oldPrice, count }) => {
    return <p className={cn(styles.old_price, styles.textmini, styles.cheap_old_price)}>{ count == 0 ? oldPrice : oldPrice * count } руб.</p>
}

export default React.memo(OldPrice);