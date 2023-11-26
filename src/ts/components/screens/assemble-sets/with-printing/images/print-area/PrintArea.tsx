import React, { FC, useState, useRef } from "react";
import styles from './PrintArea.module.scss';
import generalStyles from '../Images.module.scss';
import cn from 'classnames';

import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import { useActions } from "../../../../../../hooks/useActions";
import { useModal } from '../../../../../../hooks/useModal';
import { useClickOutside } from '../../../../../../hooks/useClickOutside';
import { useDebounceEffect } from '../../../../../../hooks/useDebounceEffect';
import { centerAspectCrop } from './centerAspectCrop';

import BtnClose from '../../../../../ui/btn-close/BtnClose';
import BtnBlue from "../../../../../ui/btn-blue/BtnBlue";

import ReactCrop, { Crop,  PixelCrop } from 'react-image-crop'
import { canvasPreview } from './canvasPreview'

import 'react-image-crop/src/ReactCrop.scss'
import './reactCrop.scss';

const PrintArea: FC<{ isVisible: boolean, closeModal: () => void }> = ({ isVisible, closeModal }) => {
    const { customImage } = useAppSelector(state => state.assembleSets);
    const { addImage, setTextNotify } = useActions();

    useModal(isVisible);
    useClickOutside('#image-crop', 'active', () => closeModal(), '#mobile-crop-image');

    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [scale, setScale] = useState<number>(1);
    const [rotate, setRotate] = useState<number>(0);

    useDebounceEffect(
        async () => {
          if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
          ) {
            // We use canvasPreview as it's much faster than imgPreview.
            canvasPreview(
              imgRef.current,
              previewCanvasRef.current,
              completedCrop,
              scale,
              rotate,
            )
          }
        },
        100,
        [completedCrop, scale, rotate],
    )

    async function onDownloadCropClick() {
        const image = imgRef.current
        const previewCanvas = previewCanvasRef.current
        if (!image || !previewCanvas || !completedCrop) {
          throw new Error('Crop canvas does not exist')
        }
    
        // This will size relative to the uploaded image
        // size. If you want to size according to what they
        // are looking at on screen, remove scaleX + scaleY
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
    
        const offscreen = new OffscreenCanvas(
          completedCrop.width * scaleX,
          completedCrop.height * scaleY,
        )
        const ctx = offscreen.getContext('2d')
        if (!ctx) {
          throw new Error('No 2d context')
        }
    
        ctx.drawImage(
          previewCanvas,
          0,
          0,
          previewCanvas.width,
          previewCanvas.height,
          0,
          0,
          offscreen.width,
          offscreen.height,
        )

        const blob = await offscreen.convertToBlob({ type: 'image/png' })

        // Прежде чем передавать в хранилище redux нужно сделать запрос на сервер для преобразование blob в обычный url
        // На стороне frontend без сервера такое не получится сделать
        // Поэтому напрямую отправляю blob ссылку в хранилище, но картинка через время пропадаёт из за её привязки к браузеру и т.д
        // Необходимо подключить backend

        addImage(URL.createObjectURL(blob));
        closeModal();
        setTextNotify('Картинка успешно добавлена')
    }
    
    return (
        <section className={cn('modal_c_default', { 'modal_c_default_active': isVisible })}>
            <div className={cn('modal_content', generalStyles.content, styles.content, { 'active': isVisible })} id="image-crop">
                <BtnClose classPath={generalStyles.btn_path} customClass={generalStyles.btn_close} onClick={() => closeModal()}/>

                <h2 className={cn(styles.title, 'textvmiddle_bold')}>Выберите область печати</h2>
                <div className={styles.block}>
                    {
                        customImage !== '' &&
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={1}
                            circularCrop={true}
                            className="crop"
                        >
                            <img src={customImage} alt="custom picture" className={styles.image} ref={imgRef} onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                const { width, height } = e.currentTarget
                                setCrop(centerAspectCrop(width, height, 1))
                            }}/>
                        </ReactCrop>
                    }

                    {!!completedCrop && (
                        <div>
                            <canvas ref={previewCanvasRef} style={{ display: 'none' }}/>
                            <BtnBlue name="ДАЛЕЕ" condition={false} className={generalStyles.btn} onClick={onDownloadCropClick}/>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default React.memo(PrintArea);