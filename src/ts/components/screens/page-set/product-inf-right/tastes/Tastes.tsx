import React ,{ FC } from 'react';
import styles from './Tastes.module.scss';
import cn from 'classnames';

import { TastesObj } from '../../../../../types';

import TastesContent from './tastes-content/TastesContent';

const Tastes: FC<{ tastes: TastesObj[] }> = ({ tastes }) => {

    return (
        <div className={styles.tastes}>
            <h3 className={cn(styles.textvmiddle_bold, styles.tastes_title)}>Вкусы:</h3>

            <TastesContent tastes={tastes}/>
        </div>
    )
}

export default React.memo(Tastes);