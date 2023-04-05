// 전역 모달 상태를 원하는 모달로 렌더링해주는 Modals

import React from "react";
import { useModal } from "../../../hooks/useModal"
import SimpleModal from "./SimpleModal";

export const modals = {
    simple : SimpleModal,
}

const Modals = () => {
    const { modalState } = useModal();
    const { Component, props } = modalState;
    const renderComponent = () => {
        if (!Component) return null;
    }

    if(Component === SimpleModal) return <SimpleModal {...props}/>  
    
    return <>{renderComponent()}</>
}

export default Modals;