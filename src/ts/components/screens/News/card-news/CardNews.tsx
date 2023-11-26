import React, { FC } from 'react';
import styles from './CardNews.module.scss';
import cn from 'classnames';

import { INews } from '../../../../types';
import LoadableImage from '../../../ui/LoadableImage/LoadableImage';
import { Link } from 'react-router-dom';

const CardNews: FC<{ inf: INews }> = ({ inf }) => {
    return (
        <Link to={`/news/${inf.id}`} className={styles.card_link}>
            <div className={styles.card_news}>
                <div className={styles.pic}>
                   <LoadableImage src={inf.image} alt='picture_news'/>
                </div>
                <div className={styles.card_inf}>
                    <p className={cn(styles.date, styles.textmini)}>{inf.date}</p>
                    <h2 className={cn(styles.title_news, styles.textvmiddle_bold)}>{inf.name}</h2>
                    <p className={cn(styles.text, styles.textmini)}>{inf.titleText}</p>
                </div>
            </div>
        </Link>
    )
}

export default React.memo(CardNews);