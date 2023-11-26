import React, { FC, Dispatch, SetStateAction } from 'react';
import '../../../../scss/_styles.scss';

const SetsFilters: FC<{
    setDefaultFetch: Dispatch<SetStateAction<boolean>>,
    setNameFilterSets: Dispatch<SetStateAction<string>>,
    setPageSets: Dispatch<SetStateAction<number>>
}> = ({
    setDefaultFetch,
    setNameFilterSets,
    setPageSets
}) => {

    const filtersSets = (e: React.MouseEvent<HTMLParagraphElement>): void => {
        const filter = e.currentTarget as HTMLElement;

        setPageSets(1);
        setNameFilterSets(filter.innerHTML);

        if (filter.innerHTML == 'Все') setDefaultFetch(true);
    }

    return (
        <section className='filters_sec'>
            <p className='textmini filter' onClick={filtersSets}>Все</p>
            <p className='textmini filter' onClick={filtersSets}>Свадьба</p>
            <p className='textmini filter' onClick={filtersSets}>Девичник</p>
            <p className='textmini filter' onClick={filtersSets}>День рождения</p>
            <p className='textmini filter' onClick={filtersSets}>8 марта</p>
            <p className='textmini filter' onClick={filtersSets}>23 февраля</p>
            <p className='textmini filter' onClick={filtersSets}>Новый год</p>
            <p className='textmini filter' onClick={filtersSets}>День учителя</p>
            <p className='textmini filter' onClick={filtersSets}>1 сентября</p>
            <p className='textmini filter' onClick={filtersSets}>Пасха</p>
            <p className='textmini filter' onClick={filtersSets}>Без печати</p>
        </section>
    )
}

export default React.memo(SetsFilters);