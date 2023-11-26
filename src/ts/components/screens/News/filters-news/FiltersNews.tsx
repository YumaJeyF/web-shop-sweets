import React, { FC, SetStateAction, Dispatch } from "react";
import '../../../../../scss/_styles.scss';

import { useActions } from "../../../../hooks/useActions";

const FiltersNews: FC<{ setDefaultFetch: Dispatch<SetStateAction<boolean>>}> = ({ setDefaultFetch }) => {
    const { setNameFilters, setPage } = useActions();

    const filtersNews = (e: React.MouseEvent<HTMLParagraphElement>): void => {
        const filter = e.currentTarget as HTMLElement;
        setNameFilters(filter.innerHTML);
        setPage(1);

        if (filter.innerHTML == 'Все новости') setDefaultFetch(true);
    }

    return (
        <section className='filters_sec'>
            <p className='textmini filter' onClick={filtersNews}>Все новости</p>
            <p className='textmini filter' onClick={filtersNews}>Обновления ассортимента</p>
            <p className='textmini filter' onClick={filtersNews}>Акции</p>
            <p className='textmini filter' onClick={filtersNews}>Конкурсы</p>
            <p className='textmini filter' onClick={filtersNews}>Подарок на 8 марта</p>
            <p className='textmini filter' onClick={filtersNews}>Весна</p>
        </section>
    )
}

export default React.memo(FiltersNews);