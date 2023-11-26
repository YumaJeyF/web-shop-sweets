import React, { FC } from 'react';
import styles from './AdditionallyCard.module.scss';
import cn from 'classnames';

import LoadableImage from "../../../../../ui/LoadableImage/LoadableImage";
import ChangeCount from '../../../change-count/ChangeCount';

import { IAdditionally, ObjAdditionally } from '../../../../../../types';

import { useActions } from '../../../../../../hooks/useActions';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';

const AdditionallyCard: FC<{ inf: IAdditionally}> = ({ inf }) => {
    const { addParameter, removeParameter } = useActions();
    const { customData } = useAppSelector(state => state.assembleSets);

    const isAdd: boolean | undefined = customData.additionally?.some((el: ObjAdditionally) => el.name === inf.name);

    return (
        <div className={styles.card}>
            <div className={styles.top}>
                <div className={styles.pic}>
                    <LoadableImage alt='picture' src={inf.image}/>
                </div>

                <h2 className={cn(styles.name, 'textvmiddle_bold')}>{inf.name}</h2>
            </div>

            <div className={styles.bottom}>
                <p className={cn(styles.price, 'textvmiddle_bold red')}>{inf.price} руб.</p>
                <ChangeCount
                    onClickIncrease={() => addParameter({ name: inf.name, price: inf.price })}
                    onClickDecrease={() => removeParameter(inf.name)}
                    count={isAdd ? 1 : 0}
                />
            </div>
        </div>
    )
}

export default React.memo(AdditionallyCard);