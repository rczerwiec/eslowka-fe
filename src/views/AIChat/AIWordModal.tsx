import { Modal } from "../../shared/components/Modal";

interface IProps {
  isVisible: boolean;
  onClose?: () => void;
  word: string;
}

function AIWordModal({ isVisible, onClose, word}: IProps) {
    const formatedWord = word.replaceAll(",","").replaceAll(")","").replaceAll("(","").replaceAll(".","").replaceAll("?","").replaceAll("!","").replaceAll(`"`,"").replaceAll("`","").replaceAll("'","");


  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="absolute bg-whiteMain mt-20 z-20 h-2/4 w-full top-0 bg-white rounded xl:w-1/3 xl:left-0 xl:right-0 xl:mr-auto xl:ml-auto">
        <div className="absolute flex flex-col p-8 shrink h-full w-full overflow-y-auto  scrollbar-hide">
          <div className="font-inter font-bold text-3xl text-fifth z-10">
            Słówko
          </div>
            {formatedWord}
          <div className="absolute z-20 top-0 right-0 pr-8 pt-6 text-3xl text-fifth"></div>
        </div>
      </div>
    </Modal>
  );
}

export default AIWordModal;
