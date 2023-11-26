import React, { FC, useRef } from "react";

import { ISetCart } from "../../../../../../types";
import { useActions } from "../../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import { useMutation } from "@tanstack/react-query";
import { changeCart } from "../../../../../../services/changeCart";
import { useAddToCart } from "../../../../../../hooks/useAddToCart";

const ChangeCount: FC<{ setInf: ISetCart, isCheapGoods: boolean }> = ({ setInf, isCheapGoods }) => {
    const countProduct = useRef<HTMLSpanElement | null>(null);
    const { increaseCount, reduceCount, setItem, setIsFetch, setNewFetch, setTextNotify } = useActions();
    const { isLogin, userId } = useAppSelector(state => state.user);
    const { addToCart } = useAddToCart(setInf, true);

    const mutation = useMutation((action: number) => changeCart.changeCountProduct(userId, setInf.id, action), { onSuccess() { setIsFetch(true) } });

    return (
        <div className='change_count'>
        <button id="btn-change-count"
            className='btn_change textvmiddle'
            onClick={(e: React.MouseEvent) => {
                e.preventDefault();

                if (setInf.count > 1) {
                    if (isLogin) mutation.mutate(setInf.count - 1);
                    else reduceCount(setInf.id);
                }
            }}
        >-</button>
        <span className='count_product textmiddle' ref={countProduct}>{setInf.count}</span>
        <button id="btn-change-count"
            className='btn_change textvmiddle'
            onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                
                if (isCheapGoods && setInf.count == 0) {
                    if (isLogin) addToCart(e);
                    else {
                        setInf.count = 1;
                        setItem(setInf);
                        setNewFetch(setInf.personalId);
                    }

                    const removedElement: HTMLDivElement | null = (e.target as HTMLElement).closest('#set-cheap-goods');
                    if (removedElement) removedElement.remove();

                    setTextNotify(`Товар '${setInf.name}' добавлен в корзину`);
                } else {
                    if (isLogin) mutation.mutate(setInf.count + 1);
                    else increaseCount(setInf.id);
                }
            }}
        >+</button>
       </div>
    )
}

export default React.memo(ChangeCount);