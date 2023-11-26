import React, { FC, useEffect, useMemo, useState } from 'react';
import styles from './Quantity.module.scss';
import cn from 'classnames';

import '../AssembleSets.scss';

import { IQuantity } from '../../../../types';
import { useActions } from '../../../../hooks/useActions';
import { removeTheFixation } from '../../../../functions/removeTheFixation';

import CardQuantity from './card-quantity/CardQuantity';
import LinksQuantity from '../links-quantity/LinksQuantity';

const Quantity: FC<{
    data: IQuantity[] | undefined
    isLoading: boolean
    error: unknown
    classCatalog?: string
    isWithPrinting: boolean
}> = ({
    data,
    isLoading,
    error,
    classCatalog,
    isWithPrinting
}) => {
    const { setStageName, setDataQuantity, removeAllData } = useActions();
    const [ assembleData, setAssembleData ] = useState<IQuantity | null>(null);

    useEffect(() => removeTheFixation(), []);

    if (isLoading) return <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className='icon_loading'/>
    if (error) throw new Error(`${error}`);

    return (
        <div className='assemble-sec'>
            <LinksQuantity/>
            <h1 className='titlemain title'>Количество</h1>

            <div className={cn(styles.catalog, 'catalog-general', { [`${classCatalog}`]: classCatalog })}>{ data && data.length > 0 && data.map((el: IQuantity) =>
                <CardQuantity key={el.id} inf={el} assembleData={assembleData} setAssembleData={setAssembleData}/>
            )}</div>

            <button className={cn(styles.btn, 'red_btn_form', { 'red_btn_form_disabled': !assembleData })} onClick={() => {
                if (assembleData) {
                    removeAllData();
                    setDataQuantity({ data: assembleData, isWithPrinting });
                    setStageName('tastes');
                }
            }}>Далее</button>
        </div>
    )
}

export default React.memo(Quantity);