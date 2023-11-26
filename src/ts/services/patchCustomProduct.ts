import axios from "axios";

import { getUser } from "./getUser";
import { IUser, ISetCart } from "../types";

const sendCustomProduct = async (cartData: ISetCart[], productData: ISetCart, url: string) => {
    cartData.push({
        ...productData,
        id: cartData.length + 1
    });

    const response = await axios.patch(url, { cart: cartData });

    if (response.statusText === 'OK') return true;
    else throw new Error(`Возникла ошибка при попытке отправить обновлённые данные о корзине, статус ошибки: ${response.status}`);
}

export const patchCustomProduct = async (userId: string, productData: ISetCart) => {
    const userData: IUser = await getUser.getUserById(userId);

    if (userData) {
        const cartData: ISetCart[] = userData.cart;
        const url: string = `http://localhost:4200/users/${userData.id}`;

        if (cartData.length > 0) {
            const inCart: boolean = cartData.some((el: ISetCart) => el.name === productData.name && JSON.stringify(el.tastes) === JSON.stringify(productData.tastes));

            if (inCart) return false;
            else return sendCustomProduct(cartData, productData, url);
        }
        else return sendCustomProduct(cartData, productData, url);
    }
}