import React, { Dispatch, FC, SetStateAction } from 'react';
import styles from './CardQuantity.module.scss';
import cn from 'classnames';

import LoadableImage from '../../../../ui/LoadableImage/LoadableImage';
import { IQuantity } from '../../../../../types';

const CardQuantity: FC<{
    inf: IQuantity,
    assembleData: IQuantity | null,
    setAssembleData: Dispatch<SetStateAction<IQuantity | null>>
}> = ({
    inf,
    assembleData,
    setAssembleData
}) => {
    return ( 
        <div className={cn(styles.card, {
            [styles.active]: assembleData && assembleData.quantity === inf.quantity
        })}
        onClick={() => {
            if (assembleData) {
                if (assembleData.quantity === inf.quantity) setAssembleData(null);
                else setAssembleData(inf);
            }
            else if (!assembleData) setAssembleData(inf);
        }}>
            <div>
                <div className={styles.pic}>
                    <LoadableImage src={inf.image} alt='picture'/>
                </div>
                <div className={styles.block_inf}>
                    <p className={cn(styles.name, 'textmini')}>{inf.name}</p>
                    <p className={cn('textvmiddle_bold red', styles.price)}>{inf.price} руб.</p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CardQuantity);