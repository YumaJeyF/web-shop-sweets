import React, { FC } from 'react';
import styles from './Links.module.scss';

import LinkBlock from './link-block/LinkBlock';

import { useQuery } from '@tanstack/react-query';
import { ILinkMain } from '../../../../types';
import { getDataForLinks } from '../../../../services/getDataForLinks';

const Links: FC = () => {
    const { isLoading, error, data } = useQuery<ILinkMain[]>(['get-links'], () => getDataForLinks());

    if (error) throw new Error(`${error}`);

    return (
        <section className={styles.navigation}>
                <div className={styles.nav_links}>
                    { isLoading && <img src="../../../../../img/loading.gif" alt="Идёт загрузка" className='icon_loading'/> }
                    { data && data.length > 0 && data.map((inf: ILinkMain) => <LinkBlock inf={inf} key={inf.id}/>) }
                </div> 
        </section>
    )
}

export default React.memo(Links);