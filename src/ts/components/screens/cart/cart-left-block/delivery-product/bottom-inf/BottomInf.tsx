import React, { FC } from "react";
import styles from '../DeliveryProduct.module.scss';
import cn from 'classnames';
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import AgreementWithContract from "../../../../../ui/agreement-with-contract/AgreementWithContract";
import { calcResultPrice } from "../../../../../../functions/calcResultPrice";

const BottomInf: FC<{ isValid: boolean }> = ({ isValid }) => {
    const { cartItems } = useAppSelector(state => state.cart);

    return (
        <div>
            <div className={styles.result}>
                    <p className="textmini">Итоговая сумма заказа вместе с доставкой:</p>
                    <p className={cn("red textvmiddle_bold", styles.result_price)}>{calcResultPrice(cartItems)} руб.</p>
                </div>

                <button className={cn("textmini red_btn_form", styles.btn, { "red_btn_form_disabled": !isValid })} id="btn-submit-delivery">Оформить заказ</button>
                <AgreementWithContract className={styles.agree}/>
        </div>
    )
}

export default React.memo(BottomInf);