import React, { FC } from 'react';
import styles from './LinkBlock.module.scss';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { ILinkMain } from '../../../../../types';
import { useChangeSizeWindow } from '../../../../../hooks/useChangeSizeWindow';

const LinkBlock: FC<{ inf: ILinkMain }> = ({ inf }) => {
    const size = useChangeSizeWindow();

    return (
        <Link className={styles.link} to={inf.link} style={{ backgroundImage: size > 370 ? `url(${inf.image})` : '' }}>
            <div className={styles.inner_block}>
                <img src={inf.icon} className={styles.icon_link}/>
                <h1 className={styles.name_link}>
                    {inf.name}
                    <img src="../../../../img/arrow-r.svg" alt="arrow-right" className={styles.arrow_right}/>
                </h1>
                <p className={cn('textmiddle', styles.text_inf)}>{inf.text}</p>
            </div>
        </Link>
    )
}

export default React.memo(LinkBlock);