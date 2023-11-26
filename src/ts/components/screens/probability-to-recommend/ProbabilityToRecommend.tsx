import React, { FC } from 'react';
import styles from './ProbabilityToRecommend.module.scss';
import cn from 'classnames';

import Header from '../../header/Header';
import FirstStage from './first-stage/FirstStage';
import ResultEstimation from '../../ui/result-estimation/ResultEstimation';
import Footer from '../../footer/Footer';

import { useSaveNumberInUrl } from '../../../hooks/useSaveNumberInUrl';
import { useSetTitle } from '../../../hooks/useSetTitle';

const ProbabilityToRecommend: FC = () => {
    useSetTitle('Оцените нас');

    const { setStageNumber, stageNumber } = useSaveNumberInUrl();

    return (
        <>
            <Header/>
            <main className='main'>
                { stageNumber === 1 && <FirstStage setStageNumber={setStageNumber}/> }
                { stageNumber === 2 && <ResultEstimation/> }
            </main>
            <Footer/>
        </>
    )
}

export default React.memo(ProbabilityToRecommend);