import { useCallback, useState } from "react";
import { FonModal } from "../../components/Modal/FonModal"


export const useModal = () => {
    const [showModal, setShowModal] = useState(false);

    const Modal = useCallback( ({titulo, icono, ComponentIcon, fullscreen=true, customSize=false, size="lg", children}) => 
        ( <FonModal {...{showModal, setShowModal, titulo, icono, fullscreen, customSize, size}} contenido={ children } >{ ComponentIcon ?? <></> }</FonModal> ) 
    , [showModal])
    
    return { Modal, setShowModal, showModal }
} 