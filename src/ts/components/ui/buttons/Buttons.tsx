import React, { FC } from "react";
import styles from './Buttons.module.scss';
import cn from 'classnames';

const Butttons: FC<{ classBtns: string }> = ({ classBtns }) => {
    return (
        <div className={cn(styles.btns, { [`${classBtns}`]: classBtns})}>
            <button className={cn('main_button', styles.btn)}>Презентация</button>
            <button className={cn('main_button', styles.btn)}>Прайс-лист</button>
        </div>
    )
}

export default React.memo(Butttons);