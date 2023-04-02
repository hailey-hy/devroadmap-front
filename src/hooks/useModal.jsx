import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

export const useModal = () => {
    const modalState = useSelector((state) => state.modalState);
    const dispatch = useDispatch();
    const openModal = useCallback((title, body) => {
        dispatch({type:'modal-context', modalTitle: title, modalBody: body});
        dispatch({type:'modal', modalState: true});
    });
    const closeModal = useCallback(() => {
        dispatch({type:'modal', modalState: false})
    });
    return {
        modalState,
        openModal,
        closeModal
    };
}