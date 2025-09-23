import { FC } from "react";
import Modal from "./Modal";
import Character from "../Character";
import { BiSolidExit } from "react-icons/bi";
import { IFolder } from "../../store/slices/FolderSlice";
import character3 from "../../../shared/img/character3.svg";

const WordsActionModal: FC<{isVisible: boolean, closeModal: () => void, folder: IFolder, newID: number, children: JSX.Element}> = (props): JSX.Element => {


    return (
    <Modal isVisible={props.isVisible} onClose={props.closeModal}>
      <div className="relative bg-white/95 backdrop-blur-sm border border-gray-100 shadow-2xl rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={props.closeModal}
          className="absolute top-4 right-4 z-30 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
        >
          <BiSolidExit className="text-2xl" />
        </button>
        
        {/* Content */}
        <div className="relative h-full overflow-y-auto">
          {props.children}
        </div>
      </div>
    </Modal>
    )}
    
    export default WordsActionModal;