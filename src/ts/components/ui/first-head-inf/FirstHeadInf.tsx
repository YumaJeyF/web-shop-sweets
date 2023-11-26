import React, { FC } from "react";

const FirstHeadInf: FC<{ title: string, text: string }> = ({ title, text }) => {
    return (
        <div>
            <h1 className="titlebig title_h_p">{title}</h1>
            <p className="textvmiddle text_h_p text_above_picture">{text}</p>
        </div>
    )
}

export default React.memo(FirstHeadInf);