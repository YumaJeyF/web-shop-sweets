import { useDispatch } from "react-redux";
import { allActions } from "../store/actions";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";

export const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]);
}