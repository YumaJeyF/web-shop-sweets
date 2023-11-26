import axios from "axios";

export const getWeCanOffer = {
    getAll: async () => {
        const url: string = 'http://localhost:4200/weCanOffer';

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получит данные ('we-can-offer'), статус ошибки ${response.status}'`);
    }
}