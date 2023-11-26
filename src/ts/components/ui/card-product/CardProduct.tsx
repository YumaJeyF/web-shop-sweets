import React, { FC } from 'react';
import styles from './CardProduct.module.scss';
import cn from 'classnames';

import LoadableImage from '../LoadableImage/LoadableImage';
import { ISet } from '../../../types';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updateNumberPopularSets } from '../../../services/updateNumberPopularSets';

import { useAddToCart } from '../../../hooks/useAddToCart';
import Notification from '../notification/Notification';

const CardProduct: FC<{inf: ISet, maxPic?: string, isCardGift?:  boolean, isCrossed?: boolean}> = ({ inf, maxPic, isCardGift, isCrossed }) => {
    const { addToCart, isAdd, isVisible, setIsVisible } = useAddToCart(inf);

    const mutation = useMutation(({ productId, numberOfViews }: { productId: number, numberOfViews: number }) => updateNumberPopularSets(productId, numberOfViews));

    const increasingNumber = () => mutation.mutate({ productId: inf.id, numberOfViews: inf.numberOfViews }); 

    return (
        <div className={styles.block_set}>
            <Notification name={inf.name} isVisible={isVisible} setIsVisible={setIsVisible}/>
            <Link to={`/complete-sets/${inf.id}`} className={styles.link_product} onClick={increasingNumber}>
                <div>
                    <div className={styles.pic} style={{ maxHeight: maxPic }}>
                        <LoadableImage src={inf.image} alt="picture" isCrossed={isCrossed}/>
                    </div>
                    <div className={styles.main_inf}>
                        <h2 className={`${styles.textvmiddle_bold} ${styles.name}`}>{inf.name}</h2>
                        <p className={`${styles.textmini} ${styles.text}`}>{inf.text}</p>
                    </div>
                </div>
            </Link>
            <div className={styles.product_inf}>
                <Link to={`/complete-sets/${inf.id}`} style={{ textDecoration: 'none', flexShrink: 0 }} onClick={increasingNumber}>
                    <div className={styles.pr_bl}>
                        { inf.oldPrice && <p className={cn(styles.textmini, styles.old_price)}>{inf.oldPrice} руб</p> }
                        <p className={`${styles.textvmiddle_bold} ${styles.price}`}>{isCardGift && 'от'} {inf.price} руб</p>
                    </div>
                </Link>
    
                {
                    !isCardGift &&
                    (
                        isAdd 
                        ?
                        <Link to={'#'} className={styles.to_cart} style={{ textDecoration: 'none' }} id='card-product-btn'>
                            <img src="../../../../img/bag.svg" alt="package" className={styles.icon_cart}/>
                            <button className={`${styles.textmini} ${styles.btn_to_cart}`}>В корзине</button>
                        </Link>
                        :
                        <div className={styles.to_cart} onClick={addToCart} id='card-product-btn'>
                            <img src="../../../../img/bag.svg" alt="package" className={styles.icon_cart}/>
                            <button className={`${styles.textmini} ${styles.btn_to_cart}`}>В корзину</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default React.memo(CardProduct);