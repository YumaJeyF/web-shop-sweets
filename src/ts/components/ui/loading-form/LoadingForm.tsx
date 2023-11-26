import React, { FC } from "react";
import styles from './LoadingForm.module.scss';
import cn from 'classnames';

const LoadingForm: FC<{ postData: boolean, backColor: string }> = ({ postData, backColor }) => {
    return (
        <div className={cn(styles.loading, {
            [styles.loading_active]: postData
        })}
            style={{ background: backColor }}
        >
            <div className={styles.loading_inf}>
                <img src="../../../../img/loading.gif" className={styles.loading_img}/>
                <p className={cn(styles.loading_text, styles.textmiddle)}>Идёт отправка формы...</p> 
            </div>   
        </div>  
    )
}

export default React.memo(LoadingForm);