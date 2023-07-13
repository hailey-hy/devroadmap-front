import { useSelector, useDispatch } from "react-redux";
import { react, useCallback, useState } from "react";

export const useModal = () => {

    const modalState = useSelector((state) => state.modalState);
    
    const dispatch = useDispatch();
     const openModal = useCallback((Component, props) => {
        dispatch({type:'modal', modalState: {Component, props : { ...props, open : true }}});
    });
    const closeModal = useCallback((Component) => {
        dispatch({type:'modal', modalState: null});
    });

    return {
        modalState,
        openModal,
        closeModal
    };
}