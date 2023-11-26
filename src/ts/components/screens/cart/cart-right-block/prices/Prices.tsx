import React, { FC } from "react";
import styles from './Prices.module.scss';

import { useAppSelector } from "../../../../../hooks/useAppSelector";
import Price from "./price/Price";

const Prices: FC = () => {
    const { priceWithoutDiscounts, priceWithDiscounts, shippingCost, discountPromo } = useAppSelector(state => state.cart);

    return (
        <div className={styles.prices}>
            <Price titleName='Стоимость товаров' price={priceWithoutDiscounts}/>
            <Price titleName='Скидка' price={(priceWithoutDiscounts - priceWithDiscounts) + discountPromo}/>
            <Price titleName='Доставка' price={shippingCost}/>
        </div>
    )
}

export default React.memo(Prices);