import React, { FC } from "react";
import styles from './Links.modules.scss';

import { useQuery } from "@tanstack/react-query";
import { getDessertData } from "../../../../services/getDessertLinksDec";
import { IDesertLinks } from "../../../../types";
import { OtherLinks } from "../../../../types";

import HeadLink from "./head-link/HeadLink";
import OtherLink from "./other-link/OtherLink";

const Links: FC = () => {
    const { data, error } = useQuery<IDesertLinks>(['get-dessert-data'], () => getDessertData.getDecorationDessertLinks());

    if (error) throw new Error(`${error}`);

    return (
        <section className={styles.sec}>
            { data && <HeadLink headLink={data.headLink}/> }
            { data && data.otherLinks.length > 0 && data.otherLinks.map((inf: OtherLinks) => <OtherLink inf={inf} key={inf.id}/>) }
        </section>
    )
}

export default React.memo(Links)