import React, { FC, useEffect } from "react";
import styles from './FirstContent.module.scss';
import cn from 'classnames';

import { ISetCart, ObjAdditionally } from "../../../../../../../types";

import { useAppSelector } from "../../../../../../../hooks/useAppSelector";
import { useActions } from "../../../../../../../hooks/useActions";
import { useMutation } from "@tanstack/react-query";
import { vars } from "../../../../../../../vars";

import { patchCustomProduct } from '../../../../../../../services/patchCustomProduct';

import TopInf from './top-inf/TopInf';
import BtnAuthorization from '../../../../../../ui/btn-authorization/BtnAuthorization';

const FirstContent: FC<{ closeModal: () => void, name?: string }> = ({ closeModal, name }) => {
    const { customData } = useAppSelector(state => state.assembleSets);
    const { cartItems } = useAppSelector(state => state.cart);

    const { isLogin, userId } = useAppSelector(state => state.user);
    const { setItem, setStageName, setTextNotify, setIsNextWindow, removeAllData, setIsFetch } = useActions();
    
    const resultPrice: number = customData.price + (customData.additionally ? customData.additionally.reduce((acc: number, el: ObjAdditionally) => acc += el.price , 0) : 0);

    const fnSetNextContent = () => {
        const isFindFirst: boolean = cartItems.some((el: ISetCart) => el.name === customData.name);
        let isFindSecond: boolean = false;

        for (const setCart of cartItems) {
            const tastesCart: string = JSON.stringify(setCart.tastes);
            const customTastes: string = JSON.stringify(customData.tastes);

            if (tastesCart === customTastes) {
                isFindSecond = true;
                break;
            }
            else isFindSecond = false;
        }

        if (!(isFindFirst && isFindSecond)) {
            if (isLogin) setIsNextWindow();
            else {
                setItem(customData);
                setIsNextWindow();
            }          
        }
        else {
            closeModal();
            setStageName('quantity');
            removeAllData();
            setTextNotify('Такой набор уже есть в корзине. Вы можете увеличить его количество в корзине или создать новый');
        }
    }

    const mutation = useMutation<boolean | undefined>(() => patchCustomProduct(userId, customData), {
        onSuccess(data: boolean | undefined) {
            if (typeof data === 'boolean' && data) {
                setIsFetch(true);
                fnSetNextContent();
            }
        }
    });

    return (
        <div className={styles.sec}>
            <TopInf name={name}/>

            <div className={styles.result}>
                <p className={cn('textvmiddle_bold', styles.result_text)}>Итого: <span className="red">{resultPrice} руб.</span></p>
            </div>

            <div className={styles.bottom}>
                <BtnAuthorization
                    onClick={() =>{
                        if (isLogin) mutation.mutate();
                        else fnSetNextContent();
                    }}
                    nameBtn="Добавить в корзину"
                    loading={mutation.isLoading}
                    customClass={styles.btn}
                    conditionActive={false}
                />
            </div>
        </div>
    )
}

export default React.memo(FirstContent);