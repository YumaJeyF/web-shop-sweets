import React, { FC } from "react";

import Header from "../../header/Header";
import FirstStage from './first-stage/FirstStage';
import ResultEstimation from "../../ui/result-estimation/ResultEstimation";
import Footer from "../../footer/Footer";

import { useSaveNumberInUrl } from '../../../hooks/useSaveNumberInUrl';
import { useSetTitle } from "../../../hooks/useSetTitle";
import { Link } from "react-router-dom";

const Estimation: FC = () => {
    useSetTitle('Оценить нас');

    const { stageNumber, setStageNumber } = useSaveNumberInUrl();

    return (
        <>
            <Header/>
            <main className="main">
                <div className="title_top">
                    <Link to='/' className='text_link'>Главная</Link>
                    <span>»</span>
                    <p className="filter_color_active">Оценить нас</p>
                </div>
                { stageNumber === 1 && <FirstStage setStageNumber={setStageNumber}/> }
                { stageNumber === 2 && <ResultEstimation/> }
            </main>
            <Footer/>
        </>
    )
}

export default React.memo(Estimation);