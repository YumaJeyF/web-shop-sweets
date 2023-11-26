import React, { FC } from "react";

import { ISet } from "../../../types";
import CardProduct from "../card-product/CardProduct";

const BodyCatalog: FC<{ data: ISet[], loading: boolean, totalCount: number, loadMoreData: () => void }> = ({ data, loading, totalCount, loadMoreData }) => {
    return (
        <>
            <section className='product_catalog'>
                {
                    data && data.length > 0
                    ? data.map((inf: ISet) => <CardProduct inf={inf} key={inf.id}/>)
                    : <p style={{ gridColumn: '1/-1', justifySelf: 'center' }}>На данный момент таких готовых наборов нет</p>
                }
            </section>

            { loading && <img src="../../../../img/loading.gif" alt="loading..." className='icon_loading'/> }

            { data.length < totalCount && <button className='main_button btn_catalog' onClick={loadMoreData}>Показать ещё</button> }
        </>
    )
}

export default React.memo(BodyCatalog)