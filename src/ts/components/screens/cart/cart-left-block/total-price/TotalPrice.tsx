import React, { FC } from "react";
import styles from './TotalPrice.module.scss';
import cn from "classnames";

import { useAppSelector } from "../../../../../hooks/useAppSelector";

const TotalPrice: FC = () => {
    const { priceWithDiscounts, priceWithoutDiscounts, discountPromo } = useAppSelector(state => state.cart);

    return (
        <div className={styles.total_price}>
            <p className={cn(styles.textmini, styles.text)}>Общая стоимость Вашей покупки без учета доставки составит:</p>
            <div className={styles.right_block}>
                <p className={cn(styles.textvmiddle_bold, styles.red, styles.price_with_discounts)}>{priceWithDiscounts - discountPromo} руб.</p>
                <p className={cn(styles.old_price, styles.textmini)}>{priceWithoutDiscounts} руб.</p>
            </div>
        </div>
    )
}

export default React.memo(TotalPrice);