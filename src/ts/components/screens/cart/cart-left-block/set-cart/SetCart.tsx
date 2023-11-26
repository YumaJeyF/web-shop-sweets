import React, { FC } from "react";
import styles from './SetCart.module.scss';

import { ISetCart } from "../../../../../types";

import LoadableImage from "../../../../ui/LoadableImage/LoadableImage";

import ChangeCount from "./change-count/ChangeCount";
import Discounts from "./discounts/Discounts";
import RightInf from "./right-inf/RightInf";
import BtnClose from "./btn-close/BtnClose";

import { Link } from "react-router-dom";
import { useChangeSizeWindow } from "../../../../../hooks/useChangeSizeWindow";

const SetCart: FC<{ setInf: ISetCart, isCheapGoods: boolean }> = ({ setInf, isCheapGoods }) => {
    const size = useChangeSizeWindow();
    
    return (
        <div className={styles.set} id="set-cheap-goods">
            <div>
            <div className={styles.content}>
                <BtnClose isCheapGoods={isCheapGoods} id={setInf.id}/>
                <div>
                    <Link to={`/complete-sets/${setInf.id}`}>
                        <div className={styles.pic}>
                            <LoadableImage src={setInf.image}/>
                        </div>
                    </Link>
                    { size <= 520 && <ChangeCount setInf={setInf} isCheapGoods={isCheapGoods}/> }
                </div>
                <RightInf isCheapGoods={isCheapGoods} setInf={setInf}/>
            </div>

            { (!isCheapGoods && size <= 520)  && <Discounts discounts={setInf.discounts}/> }
            </div>
        </div>
    )
}

export default React.memo(SetCart);