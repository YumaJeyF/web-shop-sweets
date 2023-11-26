import React, { FC } from "react";
import styles from './SecondBlockHead.module.scss';

import Buttons from "../../../ui/buttons/Buttons";

const SecondBlockHead: FC<{ texts: string[] }> = ({ texts }) => {
    return (
        <div>
            <Buttons classBtns={styles.btns}/>

            <p className="textmiddle text_h_p" style={{ textAlign: 'left' }}>Предложения</p>

            <div>
                {
                    texts && texts.length > 0 && texts.map((text: string) => <p className="textmiddle text_h_p" style={{ textAlign: 'left' }} key={texts.indexOf(text)}>{text}</p>)
                }
            </div>

        </div>
    )
}

export default React.memo(SecondBlockHead);