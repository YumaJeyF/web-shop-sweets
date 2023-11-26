import axios from "axios";

import { ISetCart, IOrder, IUser } from "../types";
import { getUser } from "./getUser";

export const changeCart = {
    patchProduct: async (userId: string, item: ISetCart) => {

        const userData: IUser = await getUser.getUserById(userId);

        if (userData && (!userData.cart.some((el: ISetCart) => el.personalId === item.personalId) || userData.cart.length === 0)) {
           const url: string = `http://localhost:4200/users/${userData.id}`;

            userData.cart.push({
                ...item,
                id: userData.cart.length + 1
            });

            const response = await axios.patch(url, { cart: userData.cart });

            if (response.statusText !== 'OK') throw new Error(`Возникла ошибка при попытке обновить корзину пользователя, статус ошибки: ${response.status}`);
        }
    },
    changeCountProduct: async (userId: string, idProduct: number, action: number) => {
        const userData: IUser = await getUser.getUserById(userId);

        if (userData && userData.cart) {
            const findProduct: ISetCart | undefined = userData.cart.find((el: ISetCart) => el.id === idProduct);
            const url: string = `http://localhost:4200/users/${userData.id}`;

            if (findProduct) findProduct.count = action;

            const response = await axios.patch(url, { cart: userData.cart });

            if (response.statusText !== 'OK') throw new Error(`Возникла ошибка при попыте изменить количество товара, статус ошибки ${response.status}`);
        }
    },
    deleteProduct: async (userId: string, idProduct: number) => {
        const userData: IUser = await getUser.getUserById(userId);

        if (userData && userData.cart) {
            const newDataCart: ISetCart[] = userData.cart.filter((el: ISetCart) => el.id !== idProduct);
            const url: string = `http://localhost:4200/users/${userData.id}`;

            if (newDataCart) {
                const response = await axios.patch(url, { cart: newDataCart });

                if (response.statusText !== 'OK') throw new Error(`Возникла ошибка при попытке отправить обновлённые данные о корзине пользователя (удаление товара из корзины), статус ошибки: ${response.status}`);
            }
        }
    },
    postOrder: async (order: IOrder) => {
        const url: string = 'http://localhost:4200/activeOrders';

        const response = await axios.post(url, order);

        if (response.status !== 201) throw new Error(`Возникла ошибка при попытке отправить данные о заказе пользователя, статус ошибки: ${response.status}`);
    }
}