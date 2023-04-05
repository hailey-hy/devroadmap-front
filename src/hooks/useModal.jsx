import { useSelector, useDispatch } from "react-redux";
import { react, useCallback, useState } from "react";

export const useModal = () => {

    const [openedModals, setOpenedModals] = useState([]);
    const modalState = useSelector((state) => state.modalState);
    
    const dispatch = useDispatch();
     const openModal = useCallback((Component, props) => {
        dispatch({type:'modal', modalState: {Component, props : { ...props, open : true }}});
    });
    const closeModal = useCallback((Component) => {
        setOpenedModals((modals) => {
            modals.filter((modal) =>  modal.Component !== Component)
        })
        dispatch({type:'modal', modalState: openedModals});
    });

    return {
        modalState,
        openModal,
        closeModal
    };
}