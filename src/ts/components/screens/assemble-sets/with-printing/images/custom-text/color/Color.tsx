import React, { FC, Dispatch, SetStateAction } from "react";
import styles from './Color.module.scss';
import cn from 'classnames';

const Color: FC<{ color: string, activeColor: string, setActiveColor: Dispatch<SetStateAction<string>> }> = ({ color, activeColor, setActiveColor }) => {
    
    return (
        <div className={styles.color_block} onClick={() => setActiveColor(activeColor === color ? '' : color)} style={{ backgroundColor: color }}>
            <svg className={cn(styles.icon, { [styles.active]: activeColor === color })} width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: activeColor === color ? 'block' : '' }}>
                <path d="M1 5.81818L5.4 9L12 2" stroke="white" strokeWidth="3"/>
            </svg>
       </div>
    )
}

export default React.memo(Color);