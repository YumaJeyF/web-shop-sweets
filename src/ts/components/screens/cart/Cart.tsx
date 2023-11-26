import React, { FC } from 'react';
import styles from './Cart.module.scss';
import cn from 'classnames';

import Header from '../../header/Header';
import CartLeftBlock from './cart-left-block/CartLeftBlock';
import CartRightBlock from './cart-right-block/CartRightBlock';
import AddToOrder from './add-to-order/AddToOrder';
import EmtyCart from './empty-cart/EmtyCart';
import Footer from '../../footer/Footer';

import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useSetTitle } from '../../../hooks/useSetTitle';

const Cart: FC = () => {
    const { totalCountProducts, priceWithDiscounts, cartItems, discountPromo } = useAppSelector(state => state.cart);
    useSetTitle('Корзина');

    return (
        <>
            <Header/>
            <main className="main">
                <section className='title_top'>
                    <Link to={'/'} className='text_link textmini'>Главная</Link>
                    <span>»</span>
                    <p className='filter_color_active textmini'>Корзина</p>
                </section>
                <section className={styles.cart_sec}>
                    <h1 className={cn('titlemain', styles.cart_title)}>Ваша корзина</h1>

                    {
                        totalCountProducts > 0 && priceWithDiscounts > 0 && cartItems.length > 0
                        ?
                        <div>
                            <p className={cn('textmiddle', styles.price_count)}>{totalCountProducts} шт. / {priceWithDiscounts - discountPromo} руб.</p>
                            <section className={styles.two_sec_blocks}>
                                <CartLeftBlock/>
                                <CartRightBlock/>
                            </section>
                        </div>
                        :
                        <EmtyCart/>
                    }
                </section>
                { totalCountProducts > 0 && <AddToOrder/> }
            </main>
            <Footer/>
        </>
    )
}

export default React.memo(Cart);