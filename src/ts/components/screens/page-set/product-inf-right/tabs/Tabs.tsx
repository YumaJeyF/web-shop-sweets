import React, { FC, useState } from 'react';
import styles from './Tabs.module.scss';
import cn from 'classnames';

import TabTexts from './tab-texts/TabTexts';

import { ISet } from '../../../../../types';

const Tabs: FC<{ data: ISet }> = ({ data }) => {
    const [ isOpen, setIsOpen ] = useState<number>(1);

    return (
        <div className={styles.tabs}>
            <div className={styles.btns_tab}>
                <button className={cn(styles.btn, styles.textmini, { [styles.btn_active]: isOpen == 1  })} onClick={() => setIsOpen(1)}>Описание</button>
                <button className={cn(styles.btn, styles.textmini, { [styles.btn_active]: isOpen == 2 })} onClick={() => setIsOpen(2)}>Состав и пищевая ценность</button>
                <button className={cn(styles.btn, styles.textmini, { [styles.btn_active]: isOpen == 3 })} onClick={() => setIsOpen(3)}>Условия и срок хранения</button>
            </div>

            <div className={cn(styles.description, styles.tab_inf, { [styles.tab_inf_open]: isOpen == 1 })}>
                <TabTexts texts={data.description}/>
            </div>

            <div className={cn(styles.composition_nutritional, styles.tab_inf, { [styles.tab_inf_open]: isOpen == 2 })}>
                <TabTexts texts={data.compositionNutritional}/>
            </div>

            <div className={cn(styles.conditions_shelf_life, styles.tab_inf, { [styles.tab_inf_open]: isOpen == 3 })}>
                <TabTexts texts={data.conditionsAndShelfLife}/>
            </div>
        </div>
    )
}

export default React.memo(Tabs);