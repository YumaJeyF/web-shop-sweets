import React, { FC, useEffect } from "react";

import Header from '../../../header/Header';
import Footer from '../../../footer/Footer';
import Quantity from "../quantity/Quantity";
import GeneralTastes from "../general-tastes/GeneralTastes";
import Additionally from '../additionally/Additionally';

import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAssembleSets } from "../../../../hooks/useAssembleSets";

import { getInfForAssembleSets } from "../../../../services/getInfForAssembleSets";
import { useQuery } from "@tanstack/react-query";
import { IQuantity } from "../../../../types";
import { useSetTitle } from "../../../../hooks/useSetTitle";

const WithoutPrinting: FC = () => {
    const { stageName } = useAppSelector(state => state.assembleSets);
    useAssembleSets('/assemble-sets');
    useSetTitle('Собрать набор без печати');

    const { data, error, isLoading } = useQuery<IQuantity[]>(['quantity-assemble-sets'], () => getInfForAssembleSets.getQuantityByUrl('http://localhost:4200/quantityWithoutPrinting'));

    return (
        <>
            <Header/>
            <main className='main'> 
                { stageName === 'quantity' && <Quantity data={data} error={error} isLoading={isLoading} isWithPrinting={false}/> }
                { stageName === 'tastes' && <GeneralTastes nextStageName="additionally"/> }
                { stageName === 'additionally' && <Additionally/> }
            </main>
            <Footer/> 
        </>
    )
}

export default React.memo(WithoutPrinting);

