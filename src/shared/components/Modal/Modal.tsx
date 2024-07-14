import { useEffect } from "react";
import ReactDOM from "react-dom";

interface IProps {
  isVisible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

function Modal({ isVisible, onClose, children }: IProps) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  if(!isVisible) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className="fixed flex justify-center z-20 top-0 left-0 w-full h-full bg-transparent_gray" onClick={onClose}></div>
      {children}
    </>,
    document.querySelector(".modal-container")!
  );
}

export default Modal;