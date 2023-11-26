import axios from "axios";

export const getContacts = {
    getContactsData: async () => {
        const url: string = 'http://localhost:4200/contacts';
        
        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получить данные о контактах, статус ошибки ${response.status}`);
    } 
}