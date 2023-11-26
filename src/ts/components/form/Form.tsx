import React, { FC, useEffect, useState, useRef } from 'react';
import styles from './Form.module.scss';
import cn from 'classnames';
import emailjs from '@emailjs/browser';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormFields } from '../../types';
import { IForm } from '../../types';

import LoadingForm from '../ui/loading-form/LoadingForm';
import BtnClose from '../ui/btn-close/BtnClose';
import AgreementWithContract from '../ui/agreement-with-contract/AgreementWithContract';
import Fields from './fields/Fields';

const Form: FC<IForm> = ({
    classForBtnClose,
    closeModal,
    isVisible,
    classNameForm,
    classNameBlock,
    classFields,
    classTextarea,
    classTitle,
    classBtnSubmit,
    nameSaveScroll
}) => {
    const [ isChange, setIsChange ] = useState<boolean>(false);
    const form = useRef<HTMLFormElement>(null);
    const [ postData, setPostData ] = useState<boolean>(false);

    const { setValue, watch, register, handleSubmit, trigger,formState: { errors, isValid }, reset } = useForm<IFormFields>({ mode: 'onChange' });
    const objWithFields = watch();

    useEffect(() => {
        if (sessionStorage.getItem('saveFormValues')) {
            const data = sessionStorage.getItem('saveFormValues');

            if (data) {
                const parseData = JSON.parse(data);

                setValue('email', parseData.email);
                setValue('comment', parseData.message);
                setValue('name', parseData.name);
                setValue('nameCompany', parseData.nameCompany);
                setValue('telephone', parseData.telephone);

                trigger();
            }
        }
    }, []);

    useEffect(() => {
        if (isChange) sessionStorage.setItem('saveFormValues', JSON.stringify(objWithFields));
    }, [ objWithFields ]);

    const onSubmit: SubmitHandler<IFormFields> = (data): void => {
        reset();
        if (sessionStorage.getItem('saveFormValues')) sessionStorage.removeItem('saveFormValues');

        if (form.current) {
            setPostData(true);

            emailjs.sendForm('service_azm43b7', 'template_5jcckkd', form.current, 'gpKXwV-iMTZ9_3DV1')
            .then(() => {
                setPostData(false);
                alert('Форма отправлена!');
            }
            , (error) => {
                alert(`Возникла ошибка отправки формы (${error})`);
                setPostData(false);
            });
        }
    }

    return (
            <form className={cn(styles.form, 'modal_content', {
                'active': isVisible,
                [`${classNameForm}`]: classNameForm
            })} onSubmit={handleSubmit(onSubmit)} ref={form} id='form-p-o'>
                <div className={styles.form_content}>
                    <LoadingForm postData={postData} backColor='#F7EBE5'/>

                    { closeModal && classForBtnClose && <BtnClose customClass={classForBtnClose.btn} classPath={classForBtnClose.path} onClick={closeModal}/> }
                    <h1 className={cn('titlemain', { [`${classTitle}`]: classTitle, [styles.form_title]: !classTitle })}>Заказать расчёт или отправить запрос на сотрудничество</h1>
                    
                    <Fields
                        classFields={classFields}
                        classNameBlock={classNameBlock}
                        register={register}
                        errors={{
                            name: errors.name?.message,
                            telephone: errors.telephone?.message,
                            nameCompany: errors.nameCompany?.message,
                            email: errors.email?.message,
                            comment: errors.comment?.message
                        }}
                        setIsChange={setIsChange}
                        classTextarea={classTextarea}
                        nameSaveScroll={nameSaveScroll}
                    />
                    
                    <button className={cn('textmini red_btn_form', { 
                        'red_btn_form_disabled': !isValid,
                        [`${classBtnSubmit}`]: classBtnSubmit,
                        [styles.btn_secondary]: !classBtnSubmit
                    })}
                        type='submit'
                        disabled={!isValid}>Заказать расчёт
                    </button>
                    <AgreementWithContract/>
                </div>
        </form>
    )
}

export default React.memo(Form);