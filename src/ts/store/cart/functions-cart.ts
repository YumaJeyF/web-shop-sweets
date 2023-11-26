import { ISetCart, discount, ISaveCountProducts } from "../../types";
import { ICart } from "./cart.slice";
import secureLocalStorage from "react-secure-storage";

export const functionsCart = {
    changeCountWithSaving: (id: number, findItem: ISetCart, action: number) => {
        if (!secureLocalStorage.getItem('cp')) secureLocalStorage.setItem('cp', JSON.stringify([ { id: id, count: findItem.count } ]));
        else {
            const saveCountProducts: ISaveCountProducts[] = JSON.parse(String(secureLocalStorage.getItem('cp')));
            const saveFindItem: ISaveCountProducts | undefined = saveCountProducts.find((data: ISaveCountProducts) => data.id === id);
    
            if (saveFindItem) {
                saveFindItem.count += action;
                secureLocalStorage.setItem('cp', JSON.stringify(saveCountProducts));
            } else {
                saveCountProducts.push({ id: id, count: findItem.count });
                secureLocalStorage.setItem('cp', JSON.stringify(saveCountProducts));
            }
        }
    },

    applicationOfStoredData: (initialState: ICart) => {
        const saveData: ISaveCountProducts[] = JSON.parse(String(secureLocalStorage.getItem('cp')));

        if (initialState.cartItems.length > 0 && saveData && saveData.length > 0) {
            initialState.cartItems.forEach((item: ISetCart) => {
                saveData.forEach((data: ISaveCountProducts) => {
                    if (item.id === data.id) item.count = data.count;
                });
            }); 
        }
    },

    calcDiscounts: (discounts: discount[] | undefined) => {
        return discounts ? discounts.reduce((acc: number, el: discount) => acc += el.discount , 0) : 0
    }
}