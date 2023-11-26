import React, { FC } from "react";
import styles from './WithPrinting.module.scss';

import Header from '../../../header/Header';
import Footer from '../../../footer/Footer';
import GeneralTastes from "../general-tastes/GeneralTastes";
import Additionally from '../additionally/Additionally';
import Quantity from "../quantity/Quantity";
import Images from './images/Images';

import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAssembleSets } from "../../../../hooks/useAssembleSets";
import { useQuery } from "@tanstack/react-query";
import { getInfForAssembleSets } from "../../../../services/getInfForAssembleSets";
import { useSetTitle } from "../../../../hooks/useSetTitle";

const WithPrinting: FC = () => {
    const { stageName } = useAppSelector(state => state.assembleSets);
    useAssembleSets('/assemble-sets-with-printing');
    useSetTitle('Собрать набор с печатью');

    const { data, error, isLoading } = useQuery(['get-with-printing'], () => getInfForAssembleSets.getQuantityByUrl('http://localhost:4200/quantityWithPrinting'));

    return (
        <>
            <Header/>
            <main className='main'> 
                { stageName === 'quantity' && <Quantity data={data} error={error} isLoading={isLoading}  classCatalog={styles.catalog_quantity} isWithPrinting={true}/> }
                { stageName === 'tastes' && <GeneralTastes nextStageName="images"/> }
                { stageName === 'images' && <Images/> }
                { stageName === 'additionally' && <Additionally name="с индивидуальным дизайном"/> }
            </main>
            <Footer/> 
        </>
    )
}

export default React.memo(WithPrinting);

