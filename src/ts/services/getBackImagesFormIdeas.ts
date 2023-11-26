import axios from "axios";

export const getBackImagesFormIdeas = async () => {
    const url: string = 'http://localhost:4200/FormIdeasBackgroundImage';

    const response = await axios.get(url);

    if (response.statusText == 'OK') return response.data;
    else throw new Error(`Возникла ошибка при попытке получить картинку для фона формы, статус ошибки ${response.status}`);
}