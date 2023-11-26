import React, { FC } from "react";
import styles from './CartLeftBlock.module.scss';

import { useAppSelector } from "../../../../hooks/useAppSelector";
import { ISetCart } from "../../../../types";

import SetCart from "./set-cart/SetCart";
import CheapSets from "./cheap-sets/CheapSets";
import DeliveryProduct from "./delivery-product/DeliveryProduct";
import Promo from "../../../ui/promo/Promo";
import TotalPrice from "./total-price/TotalPrice";

import { useChangeSizeWindow } from "../../../../hooks/useChangeSizeWindow";

const CartLeftBlock: FC = () => {
    const { cartItems } = useAppSelector(state => state.cart);
    const size = useChangeSizeWindow();

    return (
        <section className={styles.cart_left_sec}>
            <div className={styles.bl_s_pr}>
                <div className={styles.all_products_cart}>
                    { cartItems && cartItems.length > 0 && cartItems.map((setInf: ISetCart, index: number) => <SetCart setInf={setInf} key={index} isCheapGoods={false}/>) }
                </div>
                <TotalPrice/>
            </div>
            <div className={styles.advertisement}>
                <p className={styles.text_inf}>Вместе дешевле!</p>
            </div>
                <CheapSets/>
            { size <= 930 && <Promo/> }
            <DeliveryProduct/>
        </section>
    )
}

export default React.memo(CartLeftBlock);