import React, { FC } from 'react';
import styles from './MiddleInf.module.scss';
import cn from 'classnames';

const MiddleInf: FC = () => {
    return (
        <div className={styles.middle}>
            <p className={cn(styles.inf_text, 'textmiddle')}>Расскажите подробнее, все сообщения читаю лично.</p>
            <div className={styles.director}>
                <div className={styles.left}>
                    <h3 className={cn('textmini', styles.name)}>Андрей Королёв</h3>
                    <p className={cn('textmini', styles.post)}>Руководитель Macaronshop</p>
                </div>
                <div className={styles.pic}>
                    <img src="../../../../../../img/image-director.png" alt="director" className={styles.image}/>
                </div>
            </div>
        </div> 
    )
}

export default React.memo(MiddleInf);