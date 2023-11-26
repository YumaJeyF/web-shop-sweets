import React, { FC } from "react";
import styles from './FieldComment.module.scss';
import cn from 'classnames';

import { IFieldsSecondStage } from '../FirstStage';
import { Error } from "../../../../../types";

import Textarea from "../../../../ui/textarea/Textarea";
import { UseFormRegister } from "react-hook-form";

const FieldComment: FC<{ register: UseFormRegister<IFieldsSecondStage>, error: Error }> = ({ register, error }) => {
    return (
        <>
            <Textarea<IFieldsSecondStage>
                register={register}
                nameReg="comment"
                error={error}
                name="comment"
                id="comment-estimation"
                placeholder="Текст комментария"
                nameSaveScrollHeight="commentEstimation"
                className={cn('inp_f_st m_inp_f', styles.textarea)}
            />
        </>
    )
}

export default React.memo(FieldComment);
