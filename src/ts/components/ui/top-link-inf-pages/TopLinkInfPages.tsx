import React, { FC } from "react";
import { Link } from "react-router-dom";

const TopLinkInfPages: FC<{ name: string }> = ({ name }) => {
    return (
        <section className='title_top'>
            <Link className='text_link textmini' to={'/'}>Главная</Link>
            <span>»</span>
            <p className='filter_color_active textmini'>{name}</p>
        </section>
    )
}

export default React.memo(TopLinkInfPages);