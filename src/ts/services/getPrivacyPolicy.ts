import axios from "axios";

export const getPrivacyPolicy = async () => {
    const url: string = `http://localhost:4200/privacyPolicy`;

    const response = await axios.get(url);

    if (response.statusText === 'OK') return response.data;
    else throw new Error(`Возникла ошибки при попытке получении данных о политики приватности, статус ошибки: ${response.status}`);
}