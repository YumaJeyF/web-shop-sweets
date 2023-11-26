import React, { FC } from "react";
import styles from './CorporateGifts.module.scss';

import Header from "../../header/Header";
import FirstHeadInf from "../../ui/first-head-inf/FirstHeadInf";
import SecondTopBlock from "./second-top-block/SecondTopBlock";
import Footer from "../../footer/Footer";

import TwoSections from "../../ui/two-sections/TwoSections";
import GiftsVariants from "./gifts-variants/GiftsVariants";
import CompletedOrders from "./completed-orders/CompletedOrders";
import Company from "../../ui/company/Company";
import AnswersToQuestions from "../../ui/answers-to-questions/AnswersToQuestions";

import { getHeadInf } from "../../../services/getHeadData";
import { getAnswersToQuestions } from "../../../services/getAnswersToQuestions";
import { IHead } from "../../../types";
import { ArrQuestion } from "../../../types";

import { useQueries } from "@tanstack/react-query";
import { useSetTitle } from "../../../hooks/useSetTitle";
import { useLoading } from "../../../hooks/useLoading";

const CorporateGifts: FC = () => {
    useSetTitle('Корпоративные подарки');
    const { ref, isVisible } = useLoading();

    const results = useQueries<[ { data: IHead }, { data: ArrQuestion[] } ]>({
        queries: [
          { queryKey: ['get-corporate-gifts-head'], queryFn: () => getHeadInf.get('corporateGiftsHead'), staleTime: Infinity },
          { queryKey: ['get-corporate-answers', isVisible], queryFn: () => isVisible ? getAnswersToQuestions.getByName('corporateAnswersToQuestions') : [], staleTime: Infinity }
        ]
    });

    if (results[0].error) throw new Error(`${results[0].error}`);
    if (results[1].error) throw new Error(`${results[1].error}`);

    return (
        <>
            <Header/>
            { results[0].isLoading && <img src="../../../../img/loading.gif" alt="Идёт загрузка" className="icon_loading"/> }
            {  results[0].data &&
                <TwoSections
                    FirstTopBlock={FirstHeadInf}
                    SecondTopBlock={SecondTopBlock}
                    inf={results[0].data}
                    classContent={styles.head_block}
                    classDesktopPic={styles.pic_desktop}
                    classMobilePic={styles.pic_mobile}
                    classRightBlock={styles.right_block}
                    nameLink="Корпоративные подарки"
                />
            }
            <main className="main">
                <GiftsVariants/>
                <CompletedOrders/>
                <Company/>
                { results[1].isLoading && <img src="../../../../img/loading.gif" alt="Идёт загрузка" className="icon_loading"/> }
                { results[1].data && <div ref={ref}><AnswersToQuestions data={results[1].data} classSection={styles.sec}/></div> }
            </main>
            <Footer/>
        </>
    )
}

export default React.memo(CorporateGifts);