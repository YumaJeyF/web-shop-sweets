import React, { FC } from "react";
import styles from './Delivery.module.scss';
import cn from "classnames";

const Delivery: FC = () => {
    return (
        <div className={styles.delivery}>
            <div className={styles.block}>
                <img src="../../../../../../img/delivery_icon1.svg" alt="delivery_icon1" className={styles.icon}/>
                <div className={styles.texts}>
                    <p className={cn(styles.text, styles.textmini)}>Доставка от <span className={styles.border_bottom}>400 руб.</span> в день заказа с 12 до 17 или с 17 до 21.</p>
                    <p className={cn(styles.text, styles.textmini)}><span className={styles.border_bottom}>Бесплатно</span> при заказе на сумму от 2000 руб.</p>
                </div>
            </div>
            <div className={styles.block}>
                <img src="../../../../../../img/delivery_icon2.svg" alt="delivery_icon2" className={styles.icon}/>
                <div className={styles.texts}>
                    <p className={cn(styles.text, styles.textmini)}>Самовывоз <span className={styles.border_bottom}>бесплатно.</span></p>
                    <p className={cn(styles.text, styles.textmini)}>Через 3 часа после оплаты заказа</p>
                </div>
            </div>
            <div className={styles.block}>
                <img src="../../../../../../img/delivery_icon3.svg" alt="delivery_icon3" className={styles.icon}/>
                <p className={cn(styles.text, styles.textmini)}>Можем преподнести как анонимный подарок:)</p>
            </div>
        </div>
    )
}

export default React.memo(Delivery);