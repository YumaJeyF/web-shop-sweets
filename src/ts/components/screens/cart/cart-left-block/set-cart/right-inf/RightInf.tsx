import React, { FC } from "react";
import styles from './RightInf.module.scss';
import cn from 'classnames';

import TastesCart from "../tastes/TastesCart";
import ChangeCount from "../change-count/ChangeCount";
import Discounts from "../discounts/Discounts";
import Price from "../price/Price";
import OldPrice from "../old-price/OldPrice";

import { Link } from "react-router-dom";
import { ISetCart } from "../../../../../../types";
import { useChangeSizeWindow } from "../../../../../../hooks/useChangeSizeWindow";

const RightInf: FC<{ isCheapGoods: boolean, setInf: ISetCart }> = ({ isCheapGoods, setInf }) => {
    const size = useChangeSizeWindow();
    
    return (
        <div className={styles.right_inf}>
            { !isCheapGoods && <Link className={cn(styles.textmini, styles.title_set)} to={`/complete-sets/${setInf.id}`}>{setInf.name}</Link> }
            <div className={styles.middle}>
                <div>
                    { !isCheapGoods ? <TastesCart tastes={setInf.tastes} /> : <Link className={cn(styles.textmini, styles.title_set, styles.title_ch_gs)} to={`/complete-sets/${setInf.id}`}>{setInf.name}</Link> }

                    { (isCheapGoods && setInf.oldPrice && size <= 520) && <OldPrice oldPrice={setInf.oldPrice} count={setInf.count}/> }

                    { size <= 520 &&  <Price isCheapGoods={isCheapGoods} setInf={setInf}/> }
                </div>

                { size > 520 && <ChangeCount setInf={setInf} isCheapGoods={isCheapGoods}/> }
                <div className={styles.price_block}>
                    { (isCheapGoods && setInf.oldPrice && size > 520) && <OldPrice oldPrice={setInf.oldPrice} count={setInf.count}/> }
                    { size > 520 && <Price isCheapGoods={isCheapGoods} setInf={setInf}/> }
                </div>
            </div>
            { (!isCheapGoods && size > 520)  && <Discounts discounts={setInf.discounts}/> }
        </div>
    )
}

export default React.memo(RightInf);