import React, { FC } from "react";
import styles from '../DeliveryProduct.module.scss';
import cn from "classnames";

import { optionsDate } from "../optionsSelect";
import { optionTime } from "../optionsSelect";

import { Controller, Control } from "react-hook-form";

import SeparateSelect from "./separate-select/SeparateSelect";
import { IFormDeliveryProduct } from "../typesDelivery";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import { useActions } from "../../../../../../hooks/useActions";

const Selectors: FC<{ control: Control<IFormDeliveryProduct>, changeIsReload: () => void }> = ({ control, changeIsReload }) => {
    const { dateValue, timeValue } = useAppSelector(state => state.cart);
    const { setDateValue, setTimeValue } = useActions();

    return (
        <div className={cn(styles.form_flex, styles.form_block, styles.selectors)}>
            <div className={styles.inp_block}>
                <h4 className={cn(styles.textmini, styles.name_field)}>Дата получения</h4>
                <Controller
                    control={control}
                    name='date'
                    rules={{
                        required: 'Вы не указали дату'
                    }}
                    render={({ field: { onChange }, fieldState: { error } }) => 
                    <>
                        <SeparateSelect options={optionsDate} onChange={onChange} currentInf={dateValue} setCurrentInf={setDateValue} changeIsReload={changeIsReload}/>
                        { error && <p className={cn(styles.red, styles.error)}>{error.message}</p> }
                    </>
                    }
                />
            </div>
            <div className={styles.inp_block}>
                <h4 className={cn(styles.textmini, styles.name_field)}>Время</h4>
                <Controller
                    control={control}
                    name='time'
                    rules={{
                        required: 'Вы не указали время'
                    }}
                    render={({ field: { onChange }, fieldState: { error } }) => 
                        <>
                            <SeparateSelect options={optionTime} onChange={onChange} currentInf={timeValue} setCurrentInf={setTimeValue} changeIsReload={changeIsReload}/>
                            { error && <p className={cn(styles.red, styles.error)}>{error.message}</p> }
                        </>
                    }
                />
            </div>
        </div>
    )
}

export default React.memo(Selectors);