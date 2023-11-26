import React, { FC } from "react";
import styles from './CardProblem.module.scss';
import cn from 'classnames';

import Input from '../../../../ui/inputs/Input/Input';

import { IFieldsSecondStage } from '../FirstStage';
import { UseFormRegister } from "react-hook-form";
import { Error } from "../../../../../types";

const CardProblem: FC<{ register: UseFormRegister<IFieldsSecondStage>, index: number, problem: string }> = ({ register, index, problem }) => {
    return (
        <div className={styles.card}>
            <Input<IFieldsSecondStage>
                register={register}
                nameReg="problem"
                options={{
                    required: true
                }}
                type="checkbox"
                name="problem"
                className={styles.check}
                id={`problem-${index}`}
                error='empty'
                value={problem}
            />
        </div>
    )
}

export default React.memo(CardProblem);