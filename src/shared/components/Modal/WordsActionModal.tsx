import { FC } from "react";
import Modal from "./Modal";
import Character from "../Character";
import { BiSolidExit } from "react-icons/bi";
import { IFolder } from "../../store/slices/FolderSlice";
import character3 from "../../../shared/img/character3.svg";

const WordsActionModal: FC<{isVisible: boolean, closeModal: () => void, folder: IFolder, newID: number, children: JSX.Element}> = (props): JSX.Element => {


    return (
    <Modal isVisible={props.isVisible} onClose={props.closeModal}>
    <div className="absolute bg-whiteMain mt-20 z-20 h-3/4 w-full top-0 bg-white rounded xl:w-1/3 xl:left-0 xl:right-0 xl:mr-auto xl:ml-auto">
      <div className="absolute flex flex-col shrink h-full w-full overflow-y-auto  scrollbar-hide z-10">
        <span className="z-10">{props.children}</span>
        <Character alt="character2" className="absolute z-0 w-3/6 bottom-0 left-auto" character={character3}/>
        <div className="absolute top-0 right-0 pr-8 pt-6 text-3xl z-20 text-fifth ">
          <BiSolidExit className="hover:text-4xl hover:cursor-pointer" onClick={props.closeModal} />
        </div>
      </div>
    </div>
    </Modal>
    )}
    
    export default WordsActionModal;