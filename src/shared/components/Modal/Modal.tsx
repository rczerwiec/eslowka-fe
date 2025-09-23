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
      <div 
        className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
        onClick={onClose}
      >
        <div 
          className="pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>,
    document.querySelector(".modal-container")!
  );
}

export default Modal;