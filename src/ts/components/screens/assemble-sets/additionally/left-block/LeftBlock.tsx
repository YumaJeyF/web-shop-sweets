import React, { FC } from "react";

import '../../AssembleSets';

import { useQuery } from "@tanstack/react-query";
import { getInfForAssembleSets } from "../../../../../services/getInfForAssembleSets";
import { IAdditionally } from "../../../../../types";

import AdditionallyCard from './additionally-card/AdditionallyCard';

const LeftBlock: FC = () => {
    const { data, isLoading, error } = useQuery<IAdditionally[]>(['get-additionally'], () => getInfForAssembleSets.getAdditionally());

    if (isLoading) return <img src="" alt="Идёт загрузка..." className="icon_loading"/>
    if (error) throw new Error(`${error}`); 

    return (
        <section className="catalog-general assemble-catalog ">{ data && data.length > 0 && data.map((el: IAdditionally) => <AdditionallyCard key={el.id} inf={el}/>) }</section>
    )
}

export default React.memo(LeftBlock);