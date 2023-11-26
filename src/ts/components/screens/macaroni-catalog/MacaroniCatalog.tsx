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

const MacaroniCatalog: FC = () => {
    useSetTitle('Каталог макарон');

    const { page, nameFilter } = useAppSelector(state => state.macaroni);
    const { setPageMacaroni, setFilterMacaroni, setPageAndFilterMacaroni } = useActions();
    const limit: number = 6;

    const { isLoading, error, setDefaultFetch, data, loading, totalCount, loadMoreData  } = useGetData(nameFilter ,setFilterMacaroni, page, setPageMacaroni, setPageAndFilterMacaroni, 
        () => getSets.getDataWithPagination(limit, page, nameFilter, 'macaroni')
    );
    
    if (error) throw new Error(`${error}`);

    return (
        <>
            <Header/>
            <main className="main">
                <section className='catalog_sec'>
                    <TitleTopSets nameCurrentPage="Готовые наборы макарон"/>
                    <h1 className="titlemain title_catalog">Готовые наборы макарон</h1>

                    {
                        isLoading 
                        ? <img src="../../../../img/loading.gif" alt="Идёт загрузка..." className="icon_loading"/>
                        :
                        <>
                            <SetsFilters setDefaultFetch={setDefaultFetch} setNameFilterSets={setFilterMacaroni} setPageSets={setPageMacaroni}/>
                            <BodyCatalog loadMoreData={loadMoreData} loading={loading} data={data} totalCount={totalCount}/>   
                        </>
                    }
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default React.memo(MacaroniCatalog);