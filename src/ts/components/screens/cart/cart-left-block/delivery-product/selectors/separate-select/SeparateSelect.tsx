import React, { FC } from "react";
import Select, { OnChangeValue } from 'react-select';
import './SeparateSelect.scss';

import { IOptionSelectDelivery } from "../../typesDelivery";
import { ISeparateSelect } from "../../typesDelivery";

const SeparateSelect: FC<ISeparateSelect> = ({ options, onChange, setCurrentInf, currentInf, changeIsReload }) => {
    const changeValue = (newValue: OnChangeValue<IOptionSelectDelivery, boolean>) => {
        setCurrentInf((newValue as IOptionSelectDelivery).value)
        onChange((newValue as IOptionSelectDelivery).value);
        changeIsReload();
    }

    const getValue = (currentInf: string, options: IOptionSelectDelivery[]) => currentInf ? options.find((option: IOptionSelectDelivery) => option.value === currentInf) : [];

    return (
        <Select
            classNamePrefix='custom-select'
            options={options}
            value={getValue(currentInf, options)}
            onChange={changeValue}
            isSearchable={false}
        />
    )
}

export default React.memo(SeparateSelect);