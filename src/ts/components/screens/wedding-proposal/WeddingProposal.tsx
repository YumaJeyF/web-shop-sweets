import React, { FC } from 'react';
import styles from './WeddingProposal.module.scss';

import Header from '../../header/Header';
import TwoSections from '../../ui/two-sections/TwoSections';
import FirstHeadInf from '../../ui/first-head-inf/FirstHeadInf';
import SecondBlockHead from './second-block-head/SecondBlockHead';
import WeddingSets from './wedding-sets/WeddingSets';
import FormIdeas from './form-ideas/FormIdeas';
import AnswersToQuestions from '../../ui/answers-to-questions/AnswersToQuestions';
import Footer from '../../footer/Footer';

import { useQueries } from '@tanstack/react-query';
import { getHeadInf } from '../../../services/getHeadData';
import { getAnswersToQuestions } from '../../../services/getAnswersToQuestions';
import { useSetTitle } from '../../../hooks/useSetTitle';
import { useLoading } from '../../../hooks/useLoading';
import { IHead } from '../../../types';
import { ArrQuestion } from '../../../types';

const WeddingProposal: FC = () => {
    useSetTitle('Свадебное предложение');
    const { ref, isVisible } = useLoading();

    const results = useQueries<[ { data: IHead }, { data: ArrQuestion[] } ]>({
        queries: [
          { queryKey: ['get-wedding-propsal'], queryFn: () => getHeadInf.get('weddingProposalHead'), staleTime: Infinity },
          { queryKey: ['get-corporate-answers', isVisible], queryFn: () => isVisible ? getAnswersToQuestions.getByName('weddingAnswersToQuestions') : [], staleTime: Infinity }
        ]
    });

    if (results[0].error) throw new Error(`${results[0].error}`);
    if (results[1].error) throw new Error(`${results[1].error}`);

    return (
        <>
            <Header/>
            <main>
                { results[0].isLoading && <img src="../../../../img/loading.gif" alt="Идёт загрузка.." className='icon_loading'/> }
                {
                    results[0].data &&
                    <TwoSections
                        FirstTopBlock={FirstHeadInf}
                        SecondTopBlock={SecondBlockHead}
                        inf={results[0].data} 
                        classContent={styles.head_block}
                        classDesktopPic={styles.pic_desktop}
                        classMobilePic={styles.pic_mobile}
                        classRightBlock={styles.right_block}
                        nameLink="Предложение для свадеб"
                    />
                }
                <div className='main'><WeddingSets/></div>
                <FormIdeas/>
                <div className='main'>
                    { results[1].isLoading && <img src="../../../../img/loading.gif" alt="Идёт загрузка..." className='icon_loading'/> }
                    { results[1].data && <div ref={ref}><AnswersToQuestions data={results[1].data} classSection={styles.a_sec}/></div> }
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default React.memo(WeddingProposal);