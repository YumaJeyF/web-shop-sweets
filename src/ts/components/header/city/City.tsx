import React, { FC } from 'react';
import styles from './../Header.module.scss';
import cn from 'classnames';

const City: FC = () => {
    return (
        <div className={cn(styles.block, styles.block_top)}>
            <img src="../../../../../img/mark-location.svg" alt="mark location" />
            <p className={cn('textmini', styles.link__main)}>Санкт-Петербург</p>
        </div>
    )
}

export default React.memo(City);