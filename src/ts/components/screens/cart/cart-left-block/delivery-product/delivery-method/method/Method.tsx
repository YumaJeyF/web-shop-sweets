import React, { FC } from 'react';
import styles from '../../DeliveryProduct.module.scss';
import cn from 'classnames';

import { useAppSelector } from '../../../../../../../hooks/useAppSelector';
import { IBlockInfMethod } from '../../typesDelivery';

const Method: FC<IBlockInfMethod> = ({ idOpen, currentId, changeDeliveryMethod, srcIcon, nameDelivery, condition, errorMessage }) => {
    const { deliveryPrice } = useAppSelector(state => state.cart);
    
    return (
        <div
            className={cn(styles.block_mt, { [styles.block_mt_active]: idOpen == currentId })}
            onClick={() => changeDeliveryMethod(currentId, nameDelivery, deliveryPrice, condition, errorMessage)}
        >
        <img src={srcIcon} className={styles.icon}/>
        <div className={styles.block_right}>
            <h4 className={cn(styles.textmini, styles.title_mt)}>{nameDelivery}</h4>
            <p className={cn(styles.red, styles.textmini, styles.price_delivery)}>
                {nameDelivery == 'Курьерская доставка' ? deliveryPrice + ' руб.' : 'Бесплатно'}
            </p>
        </div>
    </div>
    )
}

export default React.memo(Method);