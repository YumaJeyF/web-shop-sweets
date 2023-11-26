import React,  { FC } from 'react';
import cn from 'classnames';
import styles from './Price.module.scss';

import { ISetCart } from '../../../../../../types';

const Price: FC<{ isCheapGoods: boolean, setInf: ISetCart }> = ({ isCheapGoods, setInf }) => {
    return (
        <p className={cn(styles.price, styles.textmini)}>
            Цена: <span className={styles.red}>{ isCheapGoods && setInf.count == 0 ? setInf.price : setInf.price * setInf.count } руб.</span>
        </p>
    )
}

export default React.memo(Price);