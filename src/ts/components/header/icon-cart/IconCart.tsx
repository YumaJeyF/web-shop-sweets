import React, { FC } from 'react';
import styles from './IconCart.module.scss';
import { useAppSelector } from '../../../hooks/useAppSelector';

const IconCart: FC = () => {
    const { totalCountProducts } = useAppSelector(state => state.cart);

    return (
        <div className={styles.block_cart_inf} style={{ marginLeft: 0 }}>
            <img src="../../../../img/bag.svg" alt="bag" />
            { totalCountProducts > 0 && <span className={styles.circle}>{totalCountProducts}</span> }
        </div>
    )
}

export default React.memo(IconCart);