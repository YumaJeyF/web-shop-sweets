import React, { FC } from "react";

import Header from "../../header/Header";
import TitleTopSets from "../../ui/title-top-sets/TitleTopSets";
import SetsFilters from "../../ui/sets-filters/SetsFilters";
import BodyCatalog from "../../ui/body-catalog/BodyCatalog";
import Footer from "../../footer/Footer";

import { getSets } from "../../../services/getSets";
import { useGetData } from "../../../hooks/useGetData";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useSetTitle } from "../../../hooks/useSetTitle";

const TubesCatalog: FC = () => {
    useSetTitle('Каталог трубочек');

    const { page, nameFilter } = useAppSelector(state => state.tubes);
    const { setPageTubes, setFilterTubes, setFilterAndPageTubes } = useActions();
    const limit: number = 6;

    const { isLoading, error, setDefaultFetch, data, loading, totalCount, loadMoreData  } = useGetData(nameFilter, setFilterTubes, page, setPageTubes, setFilterAndPageTubes, 
        () => getSets.getDataWithPagination(limit, page, nameFilter, 'tubes')
    );
    
    if (error) throw new Error(`${error}`);
    
    return (
        <>
            <Header/>
            <main className="main">
                <section className="catalog_sec">
                    <TitleTopSets nameCurrentPage="Готовые наборы трубочек"/>
                    <h1 className="titlemain title_catalog">Готовые наборы трубочек</h1>

                    {
                        isLoading
                        ? <img src="../../../../img/loading.gif" alt="Идёт загрузка..." className="icon_loading"/>
                        :
                        <>
                            <SetsFilters setDefaultFetch={setDefaultFetch} setNameFilterSets={setFilterTubes} setPageSets={setPageTubes}/>
                            <BodyCatalog loadMoreData={loadMoreData} loading={loading} data={data} totalCount={totalCount}/>
                        </>
                    }
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default React.memo(TubesCatalog);