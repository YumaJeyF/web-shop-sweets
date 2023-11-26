import React, { FC } from "react";
import styles from './Discounts.module.scss';
import cn from "classnames";

import { discount } from "../../../../../../types";

const Discounts: FC<{ discounts: discount[] | undefined}> = ({ discounts }) => {
    return (
        <div>
            {
                discounts && discounts.length > 0 && discounts.map((discount: discount) => (
                    <div className={styles.discount_inf} key={discounts?.indexOf(discount)}>
                        <p className={cn(styles.textmicro, styles.name_stock, styles.red)}>Скидка по акции "{discount.nameStock}"</p>
                        <p className={cn(styles.textmini, styles.discount)}>Скидка: <span className={styles.red}>-{discount.discount} руб.</span></p>
                    </div>
                ))
            }
        </div>
    )
}

export default React.memo(Discounts);