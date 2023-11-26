import axios from "axios";

export const getTakingCareData = async () => {
    const url: string = 'http://localhost:4200/takingCareOfYou';

    const response = await axios.get(url);

    if (response.statusText == 'OK') return response.data;
    else throw new Error(`Ошибка получения данных о "Мы обо всём заботимся", статус ошибки: ${response.status}`);
}