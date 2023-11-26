import { useAppSelector } from "./useAppSelector";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useActions } from "./useActions";
import qs from 'qs';

type saveData = {
    stageName: string
    quantity: string
    price: string
}

export const useAssembleSets = (defaultPath: string) => {
    const { stageName } = useAppSelector(state => state.assembleSets);
    const [ firstRender, setFirstRender ] = useState<boolean>(false);
    const { setStageName } = useActions();
    const navigate = useNavigate();
    const isChange = useRef<boolean>(false);
    
    useEffect(() => {
        if (window.location.search) {
            const saveData = qs.parse(window.location.search.substring(1)) as saveData;

            isChange.current = true;
            setStageName(saveData.stageName);
        }
    }, []);

    useEffect(() => {
        if (!firstRender && !isChange.current) {
            if (stageName !== 'quantity') navigate(`?${qs.stringify({ stageName })}`);
            else navigate(defaultPath);
        }

        setFirstRender(false);
        isChange.current = false;
    }, [ stageName ]);
}