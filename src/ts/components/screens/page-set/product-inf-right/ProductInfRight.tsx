import React, { FC } from 'react';
import styles from './ProductInfRight.module.scss';
import cn from 'classnames';

import { ISet } from '../../../../types';
import { TastesObj } from '../../../../types';

import Tastes from './tastes/Tastes';
import PriceBtn from './price-btn/PriceBtn';
import Delivery from './delivery/Delivery';
import Accordion from './accordion/Accordion';
import TopInf from './top_inf/TopInf';

import { useChangeSizeWindow } from '../../../../hooks/useChangeSizeWindow';
                    
const ProductInfRight: FC<{ data: ISet }> = ({ data }) => {
    const size = useChangeSizeWindow();

    return (
        <section className={styles.sec_inf_right}>
            { size > 690 && <TopInf data={data}/>}
            <section className={styles.general_block}>
                {
                    size > 690 ? <Tastes tastes={data.tastes}/> : <Accordion data={data}/>
                }
                <PriceBtn data={data}/>
            </section>
            <Delivery/>

        </section>
    )
}

export default React.memo(ProductInfRight);