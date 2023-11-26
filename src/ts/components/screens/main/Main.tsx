import React, { FC, useEffect } from "react";

import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import '../../../../scss/_styles.scss';
import TitleSection from "./title-section/TitleSection";
import Links from "./links/Links";
import Stocks from "./stocks/Stocks";
import Holidays from "./holidays/Holidays";
import PopularSets from "./popular-sets/PopularSets";
import NewsOnMainPage from "./news-on-main-page/NewsOnMainPage";
import TakingCareOfYou from "./taking-care-of-you/TakingCareOfYou";
import LoadPage from '../../ui/load-page/LoadPage';

import { useSetTitle } from "../../../hooks/useSetTitle";

const Main: FC =  () => {
    useSetTitle('Главная');

    return (
        <>
            <LoadPage/>
            <Header/>
            <TitleSection/>
            <main className='main'>
                <Links/>
                <Stocks/>
                <Holidays/>
                <PopularSets/>
                <NewsOnMainPage/>
                <TakingCareOfYou/>
            </main>
            <Footer/>
        </>
    )
}

export default React.memo(Main);