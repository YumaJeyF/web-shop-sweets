import React, { FC } from "react";
import styles from './BtnBlue.module.scss';
import cn from 'classnames';

const BtnBlue: FC<{ condition: boolean, name: string, className?: string, onClick: () => void }> = ({ condition, name, className, onClick }) => {
    return (
        <button className={cn(styles.btn, 'textmini', { 
            [styles.btn_disabled]: condition,
            [`${className}`]: className
        })}
            onClick={onClick}
        >
            {name}
        </button>
    )
}

export default React.memo(BtnBlue);