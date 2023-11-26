import React, { FC } from "react";

import Header from "../../header/Header";
import TitleTopSets from "../../ui/title-top-sets/TitleTopSets";
import SetsFilters from "../../ui/sets-filters/SetsFilters";
import BodyCatalog from "../../ui/body-catalog/BodyCatalog";
import Footer from "../../footer/Footer";

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useActions } from "../../../hooks/useActions";
import { getSets } from "../../../services/getSets";
import { useGetData } from "../../../hooks/useGetData";
import { useSetTitle } from "../../../hooks/useSetTitle";

const EclairsCatalog: FC = () => {
    useSetTitle('Каталог эклеров');

    const { page, nameFilter } = useAppSelector(state => state.eclairs);
    const { setPageEclairs, setFilterEclairs, setFilterAndPageEclairs } = useActions();
    const limit: number = 6;

    const { isLoading, error, setDefaultFetch, data, loading, totalCount, loadMoreData  } = useGetData(nameFilter, setFilterEclairs, page, setPageEclairs, setFilterAndPageEclairs, 
        () => getSets.getDataWithPagination(limit, page, nameFilter, 'eclairs')
    );
    
    if (error) throw new Error(`${error}`);

    return (
        <>
            <Header/>
            <main className="main">
                <section className="catalog_sec">
                    <TitleTopSets nameCurrentPage="Готовые наборы эклеров"/>
                    <h1 className="titlemain title_catalog">Готовые наборы эклеров</h1>

                    {
                        isLoading 
                        ? <img src="../../../../img/loading.gif" alt="Идёт загрузка..." className="icon_loading"/>
                        :
                        <>
                            <SetsFilters setDefaultFetch={setDefaultFetch} setNameFilterSets={setFilterEclairs} setPageSets={setPageEclairs}/>
                            <BodyCatalog loadMoreData={loadMoreData} loading={loading} data={data} totalCount={totalCount}/>                        
                        </>
                    }
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default React.memo(EclairsCatalog);