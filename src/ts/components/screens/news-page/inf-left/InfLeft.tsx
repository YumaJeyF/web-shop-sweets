import React, { FC } from 'react';
import styles from './InfLeft.module.scss';
import cn from 'classnames';

import { INews } from '../../../../types';
import { GiftOptions } from '../../../../types';

const InfLeft: FC<{ data: INews }> = ({ data }) => {
    return (
        <section className={styles.sec_left_inf}>
            <div className={styles.themes}>
                { data.themes.length > 0 && data.themes.map((theme: string) => (
                    <div className={styles.theme} key={data.themes.indexOf(theme)}>
                        <p key={data.themes.indexOf(theme)} className={cn(styles.theme_text, styles.textmini)}>{theme}</p>
                    </div>
                )) }
            </div>

            <div className={styles.main_inf}>
                <h1 className={cn(styles.titlemain, styles.title_big)}>{data.name}</h1>

                <div className={styles.texts}>
                    { data.texts.length > 0 && data.texts.map((text: string) => <p key={data.texts.indexOf(text)} className={cn(styles.textvmiddle, styles.text, styles.text_mi)}>{text}</p>) }
                </div>

                <h2 className={cn(styles.textvmiddle_bold, styles.title_mini)}>{data.name}</h2>
            </div>
            
            <div className={styles.block_variants}>
                <p className={cn(styles.textvmiddle, styles.text, styles.variants_title)}>Некоторые варианты подарков:</p>

                <div className={styles.variants}>
                    { data.giftOptions.length > 0 && data.giftOptions.map((option: GiftOptions) => (
                        <div className={styles.variant} key={data.giftOptions.indexOf(option)}>
                            <img src="../../../../../img/check.svg" alt="check mark" className={styles.check_icon}/>
                            <p className={cn(styles.textmiddle, styles.text_variants)}>{option.name} - {option.price}</p>    
                        </div>  
                    ))}
                </div>
            </div>
        </section>
    )
}

export default React.memo(InfLeft);