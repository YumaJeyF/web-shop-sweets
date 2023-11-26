import { createSlice } from "@reduxjs/toolkit";
import { ISetCart, discount } from "../../types";
import { IPromo } from "../../types";
import { functionsCart } from "./functions-cart";
import { ISaveCountProducts } from "../../types";
import secureLocalStorage from "react-secure-storage";
import { IFormDeliveryProduct } from "../../components/screens/cart/cart-left-block/delivery-product/typesDelivery";

export interface ICart {
    isLoading: boolean
    isFetch: boolean
    cartItems: ISetCart[]
    totalCountProducts: number
    priceWithoutDiscounts: number
    priceWithDiscounts: number
    resultPriceOrder: number
    shippingCost: number
    discountPromo: number
    countProducts: number

    newFetch: number
    modalOpen: boolean
    countLoadCheapSets: number
    isClickArrange: boolean
    promoDoesNotFit: boolean

    deliveryPrice: number
    dataDelivery: IFormDeliveryProduct | ''
    dateValue: string
    timeValue: string
}

const initialState: ICart = {
    isLoading: false,
    isFetch: true,
    cartItems: secureLocalStorage.getItem('dc') ? JSON.parse(String(secureLocalStorage.getItem('dc'))) : [],
    priceWithoutDiscounts: secureLocalStorage.getItem('pwod') ? JSON.parse(String(secureLocalStorage.getItem('pwod'))) : 0,
    priceWithDiscounts: secureLocalStorage.getItem('pwd') ? JSON.parse(String(secureLocalStorage.getItem('pwd'))) : 0,
    resultPriceOrder: 0,
    discountPromo: secureLocalStorage.getItem('pd') ? JSON.parse(String(secureLocalStorage.getItem('pd'))) : 0, 
    totalCountProducts: secureLocalStorage.getItem('tcp') ? JSON.parse(String(secureLocalStorage.getItem('tcp'))) : 0, 
    countProducts: secureLocalStorage.getItem('cp') ? JSON.parse(String(secureLocalStorage.getItem('cp'))) : 0, 

    newFetch: 0,
    modalOpen: false,
    countLoadCheapSets: 0,
    isClickArrange: false,
    promoDoesNotFit: false,

    shippingCost: secureLocalStorage.getItem('scl') ? JSON.parse(String(secureLocalStorage.getItem('scl'))) : 0,
    deliveryPrice: 400,
    dataDelivery: sessionStorage.getItem('saveDataFormDelivery') ? JSON.parse(String(sessionStorage.getItem('saveDataFormDelivery'))) : '',
    dateValue: '23.09.2023',
    timeValue: '11:00 - 12:00',
}

if (secureLocalStorage.getItem('cp')) functionsCart.applicationOfStoredData(initialState);

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        setIsLoading(state, action: { payload: boolean }) {
            state.isLoading = action.payload;
        },

        // if user login

        setCartItems(state, action) {
            state.cartItems = action.payload as ISetCart[];
            state.totalCountProducts = state.cartItems.reduce((acc: number, el: ISetCart) => acc += el.count , 0);
            state.priceWithDiscounts = state.cartItems.reduce((acc: number, el: ISetCart) => {
                const discount: number = el.discounts ? el.discounts.reduce((acc: number, el: discount) => acc += el.discount , 0) : 0;

                return acc += (el.price * el.count) - discount * el.count;
            }, 0);
            state.priceWithoutDiscounts = state.cartItems.reduce((acc: number, el: ISetCart) => acc += el.price * el.count , 0);
            state.resultPriceOrder = (state.priceWithDiscounts + state.shippingCost) - state.discountPromo;
        },
        setShippingCost(state, action) {
            state.shippingCost = action.payload;
            secureLocalStorage.setItem('scl', JSON.stringify(state.shippingCost));
        },
        setIsFetch(state, action) {
            state.isFetch = action.payload;
        },
        setDiscountPromo(state, action) {
            const { minPrice, discount } = (action.payload as IPromo);

            if (state.resultPriceOrder >= minPrice) {
                if (discount.slice(-1) === '%') state.discountPromo = (state.resultPriceOrder * parseInt(discount)) / 100;
                else  state.discountPromo = Number(discount);
            }

            secureLocalStorage.setItem('pd', JSON.stringify(state.discountPromo));
        },
        removeDiscountPromo(state, action) {
            state.discountPromo = 0;

            if (secureLocalStorage.getItem('pd') && action.payload) secureLocalStorage.removeItem('pd');
        },
        deleteAllSaveData(state) {
            state.cartItems = [];
            state.totalCountProducts = 0;
            state.priceWithDiscounts = 0;
            state.priceWithoutDiscounts = 0;
            state.discountPromo = 0;
            state.shippingCost = 0;
            state.dataDelivery = '';
            state.countProducts = 0;

            if (secureLocalStorage.getItem('dc')) secureLocalStorage.removeItem('dc');
            if (secureLocalStorage.getItem('tcp')) secureLocalStorage.removeItem('tcp');
            if (secureLocalStorage.getItem('pwd')) secureLocalStorage.removeItem('pwd');
            if (secureLocalStorage.getItem('pwod')) secureLocalStorage.removeItem('pwod');
            if (secureLocalStorage.getItem('pd')) secureLocalStorage.removeItem('pd');
            if (secureLocalStorage.getItem('scl')) secureLocalStorage.removeItem('scl');
            if (secureLocalStorage.getItem('cp')) secureLocalStorage.removeItem('cp');
            if (sessionStorage.getItem('saveDataFormDelivery')) sessionStorage.removeItem('saveDataFormDelivery');
        },

        // if user not login

        setItem(state, action: { payload: ISetCart }) {
            const currentItem: ISetCart = action.payload;
            const findItem: ISetCart | undefined = state.cartItems.find((item: ISetCart) => item.personalId === currentItem.personalId && item.name === item.name);

            if (!findItem) {
                state.cartItems.push(action.payload);
                secureLocalStorage.setItem('dc', JSON.stringify(state.cartItems));

                state.totalCountProducts += 1;
                secureLocalStorage.setItem('tcp', JSON.stringify(state.totalCountProducts));

                const discount: number = functionsCart.calcDiscounts(currentItem.discounts);

                state.priceWithDiscounts += (currentItem.price * currentItem.count) - discount;
                secureLocalStorage.setItem('pwd', JSON.stringify(state.priceWithDiscounts));

                state.priceWithoutDiscounts += currentItem.price * currentItem.count;
                secureLocalStorage.setItem('pwod', JSON.stringify(state.priceWithoutDiscounts));
            }
        },
        removeItem(state, action: { payload: number }) {
            const id: number = action.payload;
            const findItem: ISetCart | undefined = state.cartItems.find((item: ISetCart) => item.id === id);

            if (findItem) {
                state.cartItems = state.cartItems.filter((item: ISetCart) => item.id !== id);
                secureLocalStorage.setItem('dc', JSON.stringify(state.cartItems));

                state.totalCountProducts -= findItem.count;
                secureLocalStorage.setItem('tcp', JSON.stringify(state.totalCountProducts));
    
                if (secureLocalStorage.getItem('cp')) {
                    const savingCount: ISaveCountProducts[] = JSON.parse(String(secureLocalStorage.getItem('cp')));
    
                    if (savingCount.length > 0) {
                        const newSaveCount: ISaveCountProducts[] = savingCount.filter((item: ISaveCountProducts) => item.id !== id);
                        
                        secureLocalStorage.setItem('cp', JSON.stringify(newSaveCount));
                    }
                }

                const discount: number = functionsCart.calcDiscounts(findItem.discounts);

                state.priceWithDiscounts -= (findItem.price * findItem.count) - discount;
                secureLocalStorage.setItem('pwd', JSON.stringify(state.priceWithDiscounts));

                state.priceWithoutDiscounts -= findItem.price * findItem.count;
                secureLocalStorage.setItem('pwod', JSON.stringify(state.priceWithoutDiscounts));
            }

        },
        increaseCount(state, action) {
            const id: number = action.payload;
            const findItem: ISetCart | undefined = state.cartItems.find((item: ISetCart) => item.id === id);

            if (findItem) {
                findItem.count++;
                
                state.totalCountProducts++;
                secureLocalStorage.setItem('tcp', JSON.stringify(state.totalCountProducts));

                const discount: number = functionsCart.calcDiscounts(findItem.discounts);

                state.priceWithoutDiscounts += findItem.price;
                secureLocalStorage.setItem('pwod', JSON.stringify(state.priceWithoutDiscounts));

                state.priceWithDiscounts += findItem.price - discount;
                secureLocalStorage.setItem('pwd', JSON.stringify(state.priceWithDiscounts));

                functionsCart.changeCountWithSaving(id, findItem, 1);
            }
        },
        reduceCount(state, { payload: id }) {
            const findItem = state.cartItems.find((item: ISetCart) => item.id == id);

            if (findItem) {
                findItem.count--;
                
                state.totalCountProducts--;
                secureLocalStorage.setItem('tcp', JSON.stringify(state.totalCountProducts));

                const discount: number = functionsCart.calcDiscounts(findItem.discounts);

                state.priceWithoutDiscounts -= findItem.price;
                secureLocalStorage.setItem('pwod', JSON.stringify(state.priceWithoutDiscounts));

                state.priceWithDiscounts -= findItem.price - discount;
                secureLocalStorage.setItem('pwd', JSON.stringify(state.priceWithDiscounts));

                functionsCart.changeCountWithSaving(id, findItem, -1);
            }
        },
        setDeliveryPrice(state, action) {
            state.deliveryPrice = action.payload;
            secureLocalStorage.setItem('dd', JSON.stringify(state.deliveryPrice));
        },
        setNewFetch(state, action) {
            state.newFetch = action.payload;
        },
        setModalOpen(state, action) {
            state.modalOpen = action.payload;
        },
        setCountLoadCheapSets(state, action) {
            state.countLoadCheapSets = action.payload;
        },
        setIsClickArrange(state, action) {
            state.isClickArrange = action.payload;
        },
        setDataDelivery(state, action) {
            state.dataDelivery = action.payload;
        },
        setDateValue(state, action) {
            state.dateValue = action.payload;
        },
        setTimeValue(state, action) {
            state.timeValue = action.payload;
        }
    }
});

export const { reducer, actions } = cart;

