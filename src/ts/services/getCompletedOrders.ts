import axios from "axios";

export const getCompletedOrders = {
    getAll: async () => {
        const url: string = 'http://localhost:4200/completedOrders';

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получения данных о выполненных заказах, статус ошибки ${response.status}`);
    }
}