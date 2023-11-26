import React, { FC } from 'react';
import styles from './../Header.module.scss';
import cn from 'classnames';

import IconCart from '../icon-cart/IconCart';
import City from '../city/City';
import User from '../user/User';

import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useQuery } from '@tanstack/react-query';
import { useActions } from '../../../hooks/useActions';
import { useChangeSizeWindow } from '../../../hooks/useChangeSizeWindow';

import { getUser } from '../../../services/getUser';
import { ISetCart } from '../../../types';
import { removeTheFixation } from '../../../functions/removeTheFixation';

const NavTop: FC = () => {
    const { totalCountProducts, isFetch } = useAppSelector(state => state.cart);
    const size = useChangeSizeWindow();

    const { userId, isLogin } = useAppSelector(state => state.user);
    const { setCartItems, setIsFetch } = useActions();

    useQuery<ISetCart[] | null>(['get-user-cart-by-id', isFetch], () => {
        if (isLogin && userId !== '') return getUser.getUserCartByIdUser(userId);
        else return null;
    }, {
        onSuccess(data: ISetCart[] | null) {
            setIsFetch(false);

            if (data) setCartItems(data);
        }
    });

    return (
        <div className={styles.navtop}>
            <ul className={styles.block_nav} onClick={removeTheFixation}>
                <li className={styles.li}><Link to={'/freshness-guarantee'} className={cn(styles.link, 'textmini')}>Гарантия свежести</Link></li>
                <li className={styles.li}><Link to={'/delivery-and-payment'} className={cn(styles.link, 'textmini')}>Доставка и оплата</Link></li>
                <li className={styles.li}><Link to={'/wholesale-supplies'} className={cn(styles.link, 'textmini')}>Оптовые поставки</Link></li>
                <li className={styles.li}><Link to={'/contacts'} className={cn(styles.link, 'textmini')}>Контакты</Link></li>
            </ul>
            <div className={styles.city_desktop}><City/></div>
            <div className={cn(styles.block, styles.block_top)}>
                <img src="../../../../../img/phone.svg" alt="icon phone" />
                <p className='textmini'>8 812 309-82-88</p>
            </div>
            <Link to={'/main/cart'} className={cn(styles.block, styles.block_top, styles.cart_inf_mobile)}>
                <IconCart/>
                <p className='textmini'>Товара в корзине ({totalCountProducts})</p>
            </Link>
            { size > 1050 && <User/> }
        </div>
    )
}

export default React.memo(NavTop);