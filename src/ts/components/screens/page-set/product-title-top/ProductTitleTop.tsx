import React, { FC } from 'react';
import '../../../../../scss/_styles.scss';

import { Link } from 'react-router-dom';
import { ISet } from '../../../../types';

const ProductTitleTop: FC<{ data: ISet }> = ({ data }) => {
    return (
        <section className='title_top'>
            <Link to={'/'} className='text_link textmini filter_color'>Главная</Link>
            <span>»</span>
            <Link to={'/complete-sets'} className='text_link textmini filter_color'>Готовые наборы</Link>
            <span>»</span>
            <p className='textmini filter_color_active'>{data.name}</p>
        </section>
    )
}

export default React.memo(ProductTitleTop);