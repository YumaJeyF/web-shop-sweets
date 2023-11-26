import axios from "axios";

import { getUser } from "./getUser";
import { IPromo } from "../types";

export const getPromoCodes = {
    getCurrentPromoCode: async (namePromo: string, userId: string) => {
        let userPromoCodes: IPromo[] = await getUser.getPromoCodesUsed(userId);

        const url: string = `http://localhost:4200/promoCodes?name=${namePromo}`;

        const response = await axios.get(url);

        if (response.statusText === 'OK') {
            const findPromo: IPromo | undefined = response.data[0] as IPromo;

            if (findPromo) {
                if (userPromoCodes.length > 0) {
                    const result: IPromo | undefined = userPromoCodes.find((promoCode: IPromo) => promoCode.name === findPromo.name);

                    if (!result) {
                        userPromoCodes.push(findPromo);

                        const responseTwo = await axios.patch(`http://localhost:4200/users?personalId=${userId}`, [{ promoCodesUsed: userPromoCodes }]);

                        if (responseTwo.statusText === 'OK') return findPromo;
                        else throw new Error(`Возникла ошибка при попытке отправить данные о использованном промокоде, статус ошибки: ${response.status}`);
                    }
                    else return 'Пользователь использовал данный промокод';
                    
                } else return findPromo;
            }
            else return 'Промокод не найден';
        }
        else throw new Error(`Ошибка при попытке получения промокода, статус ошибки ${response.status}`);
    }
}