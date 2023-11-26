import React, { FC } from 'react';
import styles from './TopInf.module.scss';
import cn from 'classnames';

import { ISet } from '../../../../../types';

const TopInf: FC<{ data: ISet }> = ({ data }) => {
    return (
        <div>
            <h1 className={cn(styles.titlemain, styles.title_inf)}>{data.name}</h1>
            <p className={cn(styles.textmiddle, styles.text)}>{data.text}</p>
        </div>
    )
}

export default React.memo(TopInf);