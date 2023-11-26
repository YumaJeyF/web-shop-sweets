import React, { FC } from "react";

import Header from "../../header/Header";
import TitleTopSets from "../../ui/title-top-sets/TitleTopSets";
import SetsFilters from "../../ui/sets-filters/SetsFilters";
import Footer from "../../footer/Footer";

import { useGetData } from "../../../hooks/useGetData";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getSets } from "../../../services/getSets";

import { useActions } from "../../../hooks/useActions";
import { useSetTitle } from "../../../hooks/useSetTitle";

import BodyCatalog from "../../ui/body-catalog/BodyCatalog";

const Catalog: FC = () => {
    const { setPageSets, setFiltersAndPageSets, setNameFilterSets } = useActions();
    const { page, nameFilter } = useAppSelector(state => state.filterSets);
    const limit: number = 6;
    useSetTitle('Готовые наборы');

    const { isLoading, error, setDefaultFetch, data, loading, totalCount, loadMoreData  } = useGetData(nameFilter, setNameFilterSets, page, setPageSets, setFiltersAndPageSets, 
        () => getSets.getDataWithPagination(limit, page, nameFilter, 'all-sets')
    );

    if (error) throw new Error(`${error}`);

    return (
        <div>
            <Header/>
            <main className='main'>
                <section className='catalog_sec'>
                    <TitleTopSets nameCurrentPage="Готовые наборы"/>
                    <h1 className='titlemain title_catalog'>Готовые наборы</h1>

                    {
                        isLoading 
                        ? <img src="../../../../img/loading.gif" alt="Идёт загрузка..." className="icon_loading"/>
                        :
                        <>
                            <SetsFilters setDefaultFetch={setDefaultFetch} setNameFilterSets={setNameFilterSets} setPageSets={setPageSets}/>
                            <BodyCatalog data={data} loading={loading} loadMoreData={loadMoreData} totalCount={totalCount}/>   
                        </>
                    }
                </section>
            
            </main>
            <Footer/>
        </div>
    )
}

export default React.memo(Catalog);