import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

export const useSaveNumberInUrl = () => {
    const [ stageNumber, setStageNumber ] = useState<number>(1); 
    const navigate = useNavigate();
    const [ firstRender, setFirstRender ] = useState<boolean>(true);
    let isSearch: boolean = false;

    useEffect(() => {
        if (window.location.search) {
            const data = qs.parse(window.location.search.substring(1)) as { stageNumber: string };
            
            setStageNumber(Number(data.stageNumber));
            isSearch = true;
        }
    }, []);

    useEffect(() => {
        if (!firstRender && !isSearch) {
            const queryString = qs.stringify({ stageNumber });

            navigate(`?${queryString}`);
        }
        setFirstRender(false);
        isSearch = false;
    }, [ stageNumber ]);

    return { stageNumber, setStageNumber }
}