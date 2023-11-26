import axios from "axios";

export const getDeliveryAndPayment = {
    getAll: async () => {
        const url: string = 'http://localhost:4200/deliveryAndPayment';

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получить данные о доставке и оплате, статус ошибки ${response.status}`);
    }
}