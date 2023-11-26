import React, { Dispatch, FC, SetStateAction, useRef } from "react";
import styles from './Notification.module.scss';
import cn from "classnames";

import { Link } from "react-router-dom";
import { useClickOutside } from "../../../hooks/useClickOutside";
import BtnClose from "../btn-close/BtnClose";

import { useModal } from "../../../hooks/useModal";
import { vars } from "../../../vars";

const Notification: FC<{
    name: string
    isVisible: boolean
    setIsVisible: Dispatch<SetStateAction<boolean>>
    isCheapGoods?: boolean
    idProduct?: number
    cheapGoodsClose?: () => void
}> = ({
    name,
    isVisible,
    setIsVisible,
    isCheapGoods,
}) => {
    const closeModal = (): void => setIsVisible(false);

    const { body, container } = vars;

    useClickOutside('#notification-body', 'open', () => closeModal(), '#card-product-btn', '#page-set-btn', '#btn-change-count');
    useModal(isVisible);    

    return (
        <div
            className={cn(styles.notification, 'modal_c_default', { 'modal_c_default_active': isVisible })}
            onClick={(e: React.MouseEvent) => e.preventDefault()}
            style={{ cursor: 'default' }}>
                <div className={cn(styles.inf, { 'open': isVisible })} id="notification-body">
                    <BtnClose customClass={styles.btn_close} onClick={() => closeModal()}/>
                    <p className={cn(styles.titlemain, styles.n_title)}>Товар добавлен в корзину</p>
                    <p className={cn(styles.textmiddle, styles.text)}>Набор "{name}" добавлен в корзину</p>

                    <div className={styles.btns}>
                        <button className={cn(styles.main_button, styles.btn_next, styles.btn)} onClick={() => closeModal()}>Продолжить покупки</button>
                        { !isCheapGoods &&
                            <Link style={{ textDecoration: 'none' }} to={'/main/cart'} onClick={() => {
                                if (body && container) {
                                    body.style.position = '';
                                    body.style.top = '';
                                    container.style.paddingRight = '';
                                }
                            }}>
                                <button className={cn(styles.btn_checkout_now, styles.textmini, styles.btn)}>Оформить сейчас</button>
                            </Link>
                        }
                    </div>
                </div>
        </div>
    )
}

export default React.memo(Notification);