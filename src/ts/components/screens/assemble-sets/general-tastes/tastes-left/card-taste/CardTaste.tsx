import React, { FC } from "react";
import styles from './CardTaste.module.scss';
import cn from 'classnames';

import LoadableImage from "../../../../../ui/LoadableImage/LoadableImage";
import ChangeCount from '../../../change-count/ChangeCount';

import { ITastes, TastesObj } from "../../../../../../types";
import { useActions } from "../../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";

const CardTaste: FC<{ inf: ITastes }> = ({ inf }) => {
    const { increaseCountTastes, decreaseCountTastes } = useActions();
    const { customData } = useAppSelector(state => state.assembleSets);
    const currentEl: TastesObj | undefined = customData.tastes.find((el: TastesObj) => el.name === inf.name);

    return (
        <div className={styles.card}>
            <div className={styles.card_main}>
                <div className={styles.pic}>
                    <LoadableImage src={inf.image} alt="picture"/>
                </div>
            
                <div className={styles.card_middle}>
                    <h2 className={cn(styles.name, 'textvmiddle_bold')}>{inf.name}</h2>
                    <p className={cn(styles.text, 'textmini')}>{inf.text}</p>
                </div>
            </div>
            <ChangeCount
                customClass={styles.card_bottom}
                onClickDecrease={() => decreaseCountTastes(inf.name)}
                onClickIncrease={() => increaseCountTastes(inf.name)}
                count={currentEl ? currentEl.count : 0}
            />
        </div>
    )
}

export default React.memo(CardTaste);