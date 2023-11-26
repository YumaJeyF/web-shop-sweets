import React, { FC } from 'react';
import styles from './StockSlide.module.scss';
import cn from 'classnames';

import { IStocks } from '../../../../../types';

const StockSlide: FC<{data: IStocks}> = ({ data }) => {

    return (
        <div className={styles.card}>
        {
            data.appearance == 'standart' || data.appearance == 'standart_minimal'
            ?
            <div>
                <div className={styles.block_image}>
                    <div className={cn(styles.line, data.appearance)}>
                        <span
                            className={cn(styles.line_main, 'textmiddle', {
                                [styles.line_inf]: data.appearance === 'standart',
                                [styles.line_inf_others]: data.appearance != 'standart'
                            })}
                            style={{ backgroundColor: data.backColorLine, color: data.colorTextLine }}
                        >{data.name}</span>

                        {data.appearance == 'standart' && 
                            <span
                                className={styles.right_triangle}
                                style={{
                                    borderColor: `${data.backColorLine}`,
                                    borderStyle: 'solid',
                                }}
                            />
                        }
                    </div>
                    <img src={data.image} alt='stock picture' className={styles.picture} loading="lazy"/>
                </div>
                <div className={styles.block_inf} style={{background: data.backColorText}}>
                    <p className={cn('textmiddle', styles.text_stocks)} style={{color: data.colorText}}>{data.text}</p>
                </div>
            </div>

            :

            <div>
                <div className={styles.block_image} style={{ backgroundColor: data.backColorText }}>
                    <img src={data.image} alt='stock picture' className={styles.picture} loading="lazy"/>
                </div>
                <div className={styles.block_inf} style={{background: data.backColorText}}>
                    <div className={data.appearance}>
                        <span
                            className={cn(styles.line_inf, styles.line_main, 'textmiddle', { [styles.line_over_minimal]: data.appearance == 'standart_over_minimal' })}
                            style={{
                                backgroundColor: data.backColorLine,
                                color: data.colorTextLine
                            }}
                        >{data.name}</span>
                    </div>

                    <p className={cn('textmiddle', styles.text_stocks)} style={{color: data.colorText}}>{data.text}</p>
                </div>
            </div>
        }
    </div>
    )
}

export default React.memo(StockSlide);