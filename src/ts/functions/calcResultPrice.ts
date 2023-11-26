import { ISetCart, discount } from "../types"
import { useAppSelector } from "../hooks/useAppSelector";

export const calcResultPrice = (cartItems: ISetCart[]): number => {
    const { shippingCost, discountPromo } = useAppSelector(state => state.cart);

    if (cartItems.length > 0) {
        return cartItems.reduce((acc: number, el: ISetCart) => {
            const discount: number = el.discounts ? el.discounts.reduce((acc: number, item: discount) => acc += item.discount, 0) : 0;

            return acc += ((el.price * el.count) - discount * el.count); 
        }, 0) + shippingCost - discountPromo;
    }
    else return 0;
}