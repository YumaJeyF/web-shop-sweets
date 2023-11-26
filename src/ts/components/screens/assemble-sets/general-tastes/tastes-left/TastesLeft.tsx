import React, { FC } from "react";

import '../../AssembleSets.scss';

import { ITastes } from "../../../../../types";
import { useQuery } from "@tanstack/react-query";
import { getInfForAssembleSets } from '../../../../../services/getInfForAssembleSets';

import CardTaste from "./card-taste/CardTaste";

const TastesLeft: FC = () => {
    const { data, error, isLoading } = useQuery<ITastes[]>(['get-tastes'],  () => getInfForAssembleSets.getTastes());

    if (isLoading) return <img src="../../../../../../img/loading.gif" alt="Идёт загрузка..." className='icon_loading'/>
    if (error) throw new Error(`${error}`);

    return (
        <section className='assemble-catalog catalog-general'>
            { data && data.map((inf: ITastes) => <CardTaste key={inf.id} inf={inf}/>) }
        </section>
    )
}

export default React.memo(TastesLeft);