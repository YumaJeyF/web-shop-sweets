import React, { FC } from "react";
import cn from 'classnames';

import Login from "./login/Login";
import Registration from "./registration/Registration";
import PasswordRecovery from "./password-recovery/PasswordRecovery";

import { useAppSelector } from "../../../hooks/useAppSelector";

const Authorization: FC<{ isVisible: boolean, closeModal: () => void }> = ({ isVisible, closeModal }) => {
    const { nameForm } = useAppSelector(state => state.user);

    return (
        <section className={cn('modal_c_default', { 'modal_c_default_active': isVisible})}>
            { nameForm === 'login' && <Login isVisible={isVisible} closeModal={closeModal}/> }
            { nameForm === 'registration' && <Registration isVisible={isVisible} closeModal={closeModal}/>}
            { nameForm === 'password-recovery' && <PasswordRecovery isVisible={isVisible} closeModal={closeModal}/> }
        </section>
    )
}

export default React.memo(Authorization);