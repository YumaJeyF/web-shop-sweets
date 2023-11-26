import React, { FC } from "react";

import '../../../AssembleSets.scss';

import ChangeCount from "../../../change-count/ChangeCount";
import BtnClose from "../../../../../ui/btn-close/BtnClose";

import { useActions } from "../../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import { TastesObj } from "../../../../../../types";

const InfAboutTaste: FC<{ name: string }> = ({ name }) => {
    const { deleteTaste, decreaseCountTastes, increaseCountTastes } = useActions();
    const { customData } = useAppSelector(state => state.assembleSets);
    const currentEl: TastesObj | undefined = customData.tastes.find((el: TastesObj) => el.name === name);  

    return (
        <div className='inf-card'>
            <h2 className='name textmini'>{name}</h2>
            <ChangeCount
                onClickDecrease={() => decreaseCountTastes(name)}
                onClickIncrease={() => increaseCountTastes(name)}
                count={currentEl ? currentEl.count : 0}
            />
            <BtnClose customClass='btn_close' classPath='btn_path' onClick={() => deleteTaste(name)}/>
        </div>
    )
}

export default React.memo(InfAboutTaste);