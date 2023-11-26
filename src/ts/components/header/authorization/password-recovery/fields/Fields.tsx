import React, { FC, Dispatch, SetStateAction } from "react";

import { IPasswordRecoveryFields } from "../../../../../types";
import { Error } from "../../../../../types";

import { UseFormRegister, UseFormSetError } from "react-hook-form";
import { useAppSelector } from "../../../../../hooks/useAppSelector";

import FirstFields from "./first-fields/FirstFields";
import SecondFields from "./second-fields/SecondFields";

const Fields: FC<{
    register: UseFormRegister<IPasswordRecoveryFields>,
    setError: UseFormSetError<IPasswordRecoveryFields>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    errors: {
        email: Error,
        newPassword: Error,
        duplicatePassword: Error
    },
}> = ({
    register,
    setError,
    setLoading,
    errors,
}) => {
    const { isNextPage } = useAppSelector(state => state.user);

    return (
        <>
            {
                !isNextPage
                ?
                <FirstFields 
                    register={register}
                    errorEmail={errors.email}
                    setLoading={setLoading}
                    setError={setError}
                />
                :
                <SecondFields
                    register={register}
                    newPassword={errors.newPassword}
                    duplicatePassword={errors.duplicatePassword}
                />
            }
        </>
    )
}

export default React.memo(Fields);