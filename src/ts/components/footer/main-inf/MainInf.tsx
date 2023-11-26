import React, { FC } from "react";
import styles from './MainInf.module.scss';
import cn from 'classnames';

const MainInf: FC = () => {
    return (
        <div className={styles.main_inf}>
            <div className={styles.inf}>
                <img src="../../../../img/heart.svg" alt="heart" className={cn(styles.left_logo, styles.left_logo_first)}/>
                <p className={cn('textmini', styles.footer_left_block)}>Готовим вручную с любовью</p>
            </div>
            <div className={styles.inf}>
                <img src="../../../../img/car.svg" alt="car" className={cn(styles.left_logo, styles.left_logo_second)}/>
                <p className={cn('textmini', styles.footer_left_block)}>Доставим в день заказа</p>
            </div>
            <div className={styles.inf}>
                <img src="../../../../img/grains.svg" alt="grains" className={cn(styles.left_logo, styles.left_logo_third)}/>
                <p className={cn('textmini', styles.footer_left_block)}>100% миндальная мука и натуральные ингредиенты</p>
            </div> 
       </div>
    )
}

export default React.memo(MainInf);