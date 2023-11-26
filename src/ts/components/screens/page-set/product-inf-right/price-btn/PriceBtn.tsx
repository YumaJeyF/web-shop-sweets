import React, { FC } from 'react';
import styles from './PriceBtn.module.scss';
import cn from 'classnames';

import { ISet } from '../../../../../types';

import { useAddToCart } from '../../../../../hooks/useAddToCart';
import Notification from '../../../../ui/notification/Notification';

const PriceBtn: FC<{ data: ISet }> = ({ data }) => {
    const { isAdd, addToCart, isVisible, setIsVisible } = useAddToCart(data);

    return (
        <div className={styles.price_btn} >
            <Notification name={data.name} isVisible={isVisible} setIsVisible={setIsVisible}/>
            <p className={cn(styles.price, styles.textover)}>{data.price} руб</p>
            <button className={cn(styles.btn, styles.textmini, { [styles.btn_disabled]: isAdd })} onClick={addToCart} id='page-set-btn'>
                <img src="../../../../../../img/bold_bag.svg" className={styles.icon}/>
                { isAdd ? 'В корзине' : 'В корзину' }
            </button>
        </div>
    )
}

export default React.memo(PriceBtn);