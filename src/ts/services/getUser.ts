import axios from "axios";
import { IUser } from "../types";

export const getUser = {
    getUserByInf: async (password: string, email: string ) => {
        const url: string = `http://localhost:4200/users?password=${password}&emal=${email}`;

        const response = await axios.get(url);

        if (response.statusText === 'OK') {
            const data = response.data[0];

            if (data) return data;
            else return 'not found';
        }
        else throw new Error(`Возникла ошибка при попытке попытке получить данные о текущем пользователе, статус ошибки ${response.status}`);
    },
    getUserByEmail: async (email: string) => {
        const url: string = `http://localhost:4200/users?email=${email}`;

        const response = await axios.get(url);

        if (response.statusText === 'OK') {
            const data = response.data[0];

            if (data) return data;
            else return 'user not found';
        }
        else throw new Error(`Возникла ошибка при попытке узнать существует ли пользователь по email адресу, статус ошибки ${response.status}`);
    },
    getUserByTel: async (tel: string) => {
        const url: string = `http://localhost:4200/users?phoneNumber=${tel.replace('+', '%2B')}`;

        const response = await axios.get(url);

        if (response.statusText === 'OK') {
            const data = response.data[0];

            if (data) return data;
            else return 'user not found';
        }
        else throw new Error(`Возникла ошибка при попытке узнать существует ли пользователь по номеру телефона, статус ошибки ${response.status}`);
    },
    getUserById: async (id: string) => {
        const url: string = `http://localhost:4200/users?personalId=${id}`;

        const response = await axios.get(url);

        if (response.statusText === 'OK') return response.data[0];
        else throw new Error(`Возникла ошибка при попытке получить данные о пользователе по id, статус ошибки ${response.status}`);
    },
    getUserCartByIdUser: async (id: string) => {
        const url: string = `http://localhost:4200/users?personalId=${id}`;

        const response = await axios.get(url);

        if (response.statusText === 'OK') return response.data[0].cart;
        else throw new Error(`Возникла ошибка при попытке получить данные о корзине пользователе, статус ошибки ${response.status}`);
    },
    getPromoCodesUsed: async (userId: string) => {
        const url: string = `http://localhost:4200/users?personalId=${userId}`;

        const response = await axios.get(url);

        if (response.statusText === 'OK') return (response.data[0] as IUser).promoCodesUsed;
        else throw new Error(`Возникла ошибка при попытке получения данных об использованных промокодов пользователя, статус ошибки ${response.status}`);
    },
    getUserForCheckId: async (userId: string) => {
        const url: string = `http://localhost:4200/users?personalId=${userId}`;

        const response = await axios.get(url);

        if (response.statusText === 'OK') {
            const data: IUser | undefined = response.data[0];
        
            if (data) return 'user found';
            else return 'user not found';
        }
        else throw new Error(`Возникла ошибка при попытке получить данные о пользователе по id, статус ошибки ${response.status}`);
    }
}