import React, { FC } from "react";
import cn from 'classnames';

const AgreementWithContract: FC<{ className?: string }> = ({ className }) => {
    return (
        <p className={cn('textmicro', { className: className })}>
            Нажимая на кнопку "Оформить заказ" Я принимаю и соглашаюсь с <span className='blue'>Договором оферты</span> и разрешаю обработку моих персональных данных в соответствии с <span className='blue'>Политикой конфиденциальности</span>
        </p>
    )
}

export default React.memo(AgreementWithContract);