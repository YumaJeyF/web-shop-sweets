import { useEffect, useRef, useState } from 'react';

import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

export const useGetData = (
    nameFilter: string,
    setNameFilter: ActionCreatorWithPayload<string>,
    page: number,
    setPage: ActionCreatorWithPayload<number>,
    setFilters: ActionCreatorWithPayload<any>,
    getData: () => any,
    isNews?: boolean
) => {

    const [ data, setData ] = useState([]);
    const [ totalCount, setTotalCount ] = useState<number>(0);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ defaultFetch, setDefaultFetch ] = useState<boolean>(false);

    const navigate = useNavigate();

    const isSearch = useRef<boolean>(false)
    const [ firstRender, setFirstRender ] = useState<boolean>(true);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            setFilters(params);
        } 
        else setNameFilter(isNews ? 'Все новости' : 'Все');
    }, []);

    const { error, isLoading } = useQuery(['news-page', page, nameFilter, defaultFetch], 
    () => {
        if (nameFilter != '') return getData();
        else return null;
    }, 
        {  
            keepPreviousData: true,
            onSuccess: ( response ) => {
                if (response) {
                    setTotalCount(response.headers['x-total-count']);
                    setData(response.data);
                }
                setLoading(false);
            }
        }
    )

    useEffect(() => {
        if (isSearch.current) isSearch.current = false;
        else if (!firstRender) {
            const queryString = qs.stringify({
                page,
                filter: nameFilter
            });

            navigate(`?${queryString}`);
        }
        setFirstRender(false);

    }, [ page, nameFilter, defaultFetch]);

    const loadMoreData = (): void => {
        if (data && data.length < totalCount) {
            let newPage: number = Number(page);

            setPage(page += newPage);
            setLoading(true);
        }
    }

    

    return { isLoading, error, setDefaultFetch, loading, data, totalCount, loadMoreData  }
}