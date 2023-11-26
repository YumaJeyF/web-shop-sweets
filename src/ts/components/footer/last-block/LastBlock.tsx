import React, { FC } from "react";
import styles from './LastBlock.module.scss';
import cn from 'classnames';

const LastBlock: FC = () => {
    return (
        <>
            <div className={styles.mob_inf}>
                <div className={styles.mobile_company_inf}>
                    <p className="textmicro" style={{ color: '#292929' }}>© 2021 Макароншоп</p>
                    <p className="textmicro">ООО "Квантум", Санкт-Петербург, улица Маршала Тухачевского, дом 22</p>
                </div>
                <div>
                    <h1 className={cn('textmain', styles.title)}>+7 (812) 309 82 88</h1>
                    <p className={cn('textmini', styles.inf_time)}>с 9:00 до 21:00</p>
                </div>
            </div>
            <div className={styles.soc}>
                <img src="../../../img/insta.svg" alt="instagramm" className={styles.soc_icon}/>
                <img src="../../../img/facebook.svg" alt="facebook" className={styles.soc_icon}/>
                <img src="../../../img/vkontakte.svg" alt="vk" className={styles.soc_icon}/>
            </div>
        </>
    )
}

export default React.memo(LastBlock);