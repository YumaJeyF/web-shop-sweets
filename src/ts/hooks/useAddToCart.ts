import { ISet, ISetCart } from "../types";
import { useState, useEffect } from "react";

import { useAppSelector } from "./useAppSelector";
import { useActions } from "./useActions";
import { createDataForCart } from "../functions/createDataForCart";

import { useMutation, useQuery } from "@tanstack/react-query";
import { changeCart } from "../services/changeCart";
import { getUser } from "../services/getUser";
import secureLocalStorage from "react-secure-storage";

export const useAddToCart = ( inf: ISet | ISetCart, isItemCart?: boolean) => {
    const [ isVisible, setIsVisible ] = useState<boolean>(false);
    const { setItem, setIsFetch } = useActions();
    const [ isAdd, setIsAdd ] = useState<boolean>(false);
    const { isLogin, userId } = useAppSelector(state => state.user);

    const mutations = useMutation((data: ISetCart) => changeCart.patchProduct(userId, data), {
        onSuccess() { setIsFetch(true) }
    });

    useQuery<ISetCart[] | null>(['get-cart-items'], () => {
        if (!isItemCart && isLogin && userId !== '') return getUser.getUserCartByIdUser(userId);
        else return null;
    }, {
        onSuccess(data: ISetCart[] | null) {
            if (data) {
                data.forEach((el: ISetCart) => {
                    if (el.personalId === inf.personalId) setIsAdd(true);
                });
            }
        }
    });

    useEffect(() => {
        if (secureLocalStorage.getItem('dc') && !isLogin) {
            const saveData: ISetCart[] = JSON.parse(String(secureLocalStorage.getItem('dc')));
            const findItem: ISetCart | undefined = saveData.find((el: ISetCart) => el.id == inf.id);
    
            if (findItem) setIsAdd(true);
        }
    }, []);

    const addToCart = (e: React.MouseEvent): void => {
        e.preventDefault();

        const item: ISetCart = createDataForCart(inf, 1);

        if (!isAdd || isItemCart) {
            setIsAdd(true);
            setIsVisible(true);

            if (isLogin && userId !== '') mutations.mutate(item);
            else setItem(item);
        }
        
    }

    return { addToCart, isAdd, setIsAdd, setIsVisible, isVisible }
}
