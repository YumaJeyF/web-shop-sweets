import React, { FC } from "react";
import styles from './WholesaleSupplies.module.scss';
import cn from 'classnames';

import Header from "../../header/Header";
import TwoSections from "../../ui/two-sections/TwoSections";
import FirstHeadInf from "../../ui/first-head-inf/FirstHeadInf";
import SecondHeadInf from "./second-head-inf/SecondHeadInf";
import WeCanOffer from "./we-can-offer/WeCanOffer";
import Form from "../../form/Form";
import Feedbacks from "./feedbacks/Feedbacks";
import Company from "../../ui/company/Company";
import Footer from "../../footer/Footer";

import { useQuery } from "@tanstack/react-query";
import { getHeadInf } from "../../../services/getHeadData";
import { IHead } from "../../../types";
import { useSetTitle } from "../../../hooks/useSetTitle";

const WholesaleSupplies: FC = () => {
    useSetTitle('Оптовые поставки');

    const { error, isLoading, data } = useQuery<IHead>(['get-wholesale-supplies'], () => getHeadInf.get('wholesaleSuppliesHead'));

    if (error) throw new Error(`${error}`);
    
    return (
        <>
            <Header/>
            <main>
                { isLoading && <img src="../../../../img/loading.gif" alt="Идёт загрузка" className="icon_loading"/> }
                { data && 
                    <TwoSections
                        FirstTopBlock={FirstHeadInf}
                        SecondTopBlock={SecondHeadInf}
                        inf={data} 
                        classContent={styles.head_block}
                        classDesktopPic={styles.pic_desktop}
                        classMobilePic={styles.pic_mobile}
                        classRightBlock={styles.right_block}
                        nameLink="Оптовые поставки"
                    />
                }
                <div className="main"><WeCanOffer/></div>
                <Form nameSaveScroll="wholesaleSuppliesScroll" classNameForm={styles.form}/>
                <div className="main">
                    <Feedbacks/>
                    <Company classForSection={styles.sec_company}/>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default React.memo(WholesaleSupplies);