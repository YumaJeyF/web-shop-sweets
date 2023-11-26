import React, { FC } from "react";
import styles from './SecondContent.module.scss';
import cn from 'classnames';

import { Link } from 'react-router-dom';
import { useAppSelector } from "../../../../../../../hooks/useAppSelector";
import { removeTheFixation } from '../../../../../../../functions/removeTheFixation';

const SecondContent: FC<{ name?: string }> = ({ name }) => {
    const { nameProduct, quantity } = useAppSelector(state => state.assembleSets);

    return (
        <div className={styles.sec}>
            <h1 className={cn(styles.title, 'titlemain')}>Готово!</h1>

            <p className={cn(styles.text, 'textmiddle')}>Ваш набор из {quantity} {nameProduct} {name ? `${name}` : ''} собран и добавлен в корзину.</p>

            <div className={styles.btns}>
                <Link to={'/'} className={styles.link} onClick={removeTheFixation}><button className={cn('main_button', styles.btns_left, styles.btn)}>На главную</button></Link>
                <Link to={'/main/cart'} className={styles.link} onClick={removeTheFixation}><button className={cn('red_btn_form', styles.btn)}>Перейти в корзину</button></Link>
            </div>
        </div>
    )
}

export default React.memo(SecondContent);