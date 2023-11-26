import React, { FC } from "react";
import styles from './Cap.module.scss';
import cn from "classnames";

const Cap: FC = () => {
    return (
        <div>
            <h1 className={cn(styles.titlemain, styles.title)}>Доставка и оплата</h1>
            <p className={cn(styles.text, styles.textvmiddle)}>
                Для наших покупателей доступны 2 способа доставки: <strong className={styles.strong}>курьерская доставка</strong> по Санкт-Петербургу в пределах КАД и <strong className={styles.strong}>самовывоз.</strong>
            </p>
        </div>
    )
}

export default React.memo(Cap);