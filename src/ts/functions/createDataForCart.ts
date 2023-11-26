import { ISet } from "../types"
import { ISetCart } from "../types"

export const createDataForCart = (inf: ISetCart | ISet, count: number): ISetCart => {
    const item: ISetCart = {
        id: inf.id,
        image: inf.image,
        personalId: inf.personalId,
        name: inf.name,
        price: inf.price,
        discounts: inf.discounts,
        tastes: inf.tastes,
        count: count,
        oldPrice: inf.oldPrice,
        type: inf.type,
        themes: inf.themes
    }

    return item;
}