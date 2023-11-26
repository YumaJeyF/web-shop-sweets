import axios from "axios";

export const getDataForLinks = async () => {
    const url: string = 'http://localhost:4200/links';

    const response = await axios.get(url);

    if (response.statusText == 'OK') return response.data;
    else throw new Error(`Возникла ошибка при попытке получить данные о ссылках на главной странице, статус ошибки ${response.status}`);
}