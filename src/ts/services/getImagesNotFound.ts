import axios from "axios";

export const getImagesNotFound = async () => {
    const url: string = 'http://localhost:4200/imagesNotFound';
    
    const response = await axios.get(url);

    if (response.statusText === 'OK') return response.data;
    else throw new Error(`Возникла ошибка при попытке получить данные о картинках для страницы "Not found", статус ошибки: ${response.status}`);
}