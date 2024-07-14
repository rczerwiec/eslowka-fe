import { useState } from "react";

function useModal(){
    const [isVisible, setIsVisible] = useState(false);

    const toggleModal = () => {
        setIsVisible(!isVisible)
    }

    const closeModal = () => {
        setIsVisible(false);
    };

    return {
        isVisible,
        toggleModal,
        closeModal
    }
}

export default useModal;