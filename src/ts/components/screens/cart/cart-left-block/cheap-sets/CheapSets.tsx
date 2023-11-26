import React, { FC } from 'react';
import styles from './CheapSets.module.scss';

import { getSets } from '../../../../../services/getSets';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../../../hooks/useAppSelector';
import { useActions } from '../../../../../hooks/useActions';

import SetCart from '../set-cart/SetCart';
import { ISetCart } from '../../../../../types';

const CheapSets: FC = () => {
    const { cartItems, newFetch, isFetch } = useAppSelector(state => state.cart);
    // const { setCountLoadCheapSets } = useActions();

    const { data, isLoading, error } = useQuery(['get-cheap-sets', isFetch, newFetch ], () => getSets.getCheapSets(cartItems));

    if (isLoading) return <img src="../../../../../../img/loading.gif" alt="loading..." className={styles.icon_loading} />
    if (error) throw new Error(`${error}`);

    return (
        <div className={styles.cheapGoods}>
            { data && data.length > 0 && data.map(( inf: ISetCart ) => <SetCart key={data.indexOf(inf)} setInf={inf} isCheapGoods={true}/>) }
        </div>
    )

}

export default React.memo(CheapSets);