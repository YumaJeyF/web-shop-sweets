import React, { FC } from 'react';
import styles from './CardOrder.module.scss';
import cn from 'classnames';

import LoadableImage from '../../../../ui/LoadableImage/LoadableImage';

import { ICompletedOrder } from '../../../../../types';

const CardOrder: FC<{ inf: ICompletedOrder }> = ({ inf }) => {
    return (
        <div className={styles.card}>
            <div className={styles.pic}>
                <LoadableImage src={inf.image}/>
            </div>
            <p className={cn(styles.name, styles.textmini)}>{inf.name}</p>
        </div>
    )
}

export default React.memo(CardOrder);