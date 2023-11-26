import React, { FC } from "react";
import styles from './EmptyCart.module.scss';
import cn from "classnames";

import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/useAppSelector";

const EmptyCart: FC = () => {
    const { isLoading } = useAppSelector(state => state.cart);

    if (isLoading) return <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className={cn("icon_loading", styles.load)}/>

    return (
        <div className={styles.empty_cart}>
            <h1 className={cn(styles.titlemain, styles.title)}>В корзине нет товаров</h1>
            <p className={cn(styles.textmiddle, styles.text)}>Найдите то, что вам нужно в каталоге</p>

            <Link to={'/complete-sets'} style={{ textDecoration: 'none' }}>
                <button className={cn(styles.main_button, styles.btn)}>Вернуться в каталог</button>
            </Link>
        </div>
    )
}

export default React.memo(EmptyCart);