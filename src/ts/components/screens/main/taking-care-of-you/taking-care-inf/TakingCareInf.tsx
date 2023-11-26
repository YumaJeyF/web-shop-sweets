import React, { FC } from 'react';
import styles from './TakingCareInf.module.scss';
import cn from 'classnames';

import LoadableImage from '../../../../ui/LoadableImage/LoadableImage';
import { ITakingCare } from '../TakingCareOfYou';

const TakingCareInf: FC<{ inf: ITakingCare }> = ({ inf }) => {
    return (
        <div className={styles.card}>
            <div className={styles.pic}>
                <LoadableImage src={inf.image}/>
            </div>
            <h2 className={cn(styles.name, 'textvmiddle_bold')}>{inf.name}</h2>
            <p className={cn(styles.text, 'textmini')}>{inf.text}</p>
        </div>
    )
}

export default React.memo(TakingCareInf);