import { BiSolidExit } from "react-icons/bi";
import { Modal } from "../../../../shared/components/Modal";
import { useDeleteUserFolderMutation } from "../../../../shared/store";
import { IFolder } from "../../../../shared/store/slices/FolderSlice";
import { FC } from "react";
import { toast } from "react-toastify";

const RemoveConfirmModal: FC<{isVisible: boolean, closeModal: () => void, folder: IFolder | undefined, userID: string}> = (props): JSX.Element => {
    const [removeFolder] = useDeleteUserFolderMutation();
    let folderToRemove: IFolder;
    if(props.folder !== undefined){
        folderToRemove = props.folder;
    }
    return (
        <Modal
        onClose={props.closeModal}
        isVisible={props.isVisible}
      >
        <div className="absolute bg-white mt-20 z-20 w-full top-0 bg-white rounded-lg shadow-xl xl:w-1/3 xl:left-0 xl:right-0 xl:mr-auto xl:ml-auto">
          <div className="flex flex-col p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-inter font-bold text-xl text-fifth">
                Potwierdź usunięcie
              </h2>
              <BiSolidExit
                className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={props.closeModal}
              />
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 text-base">
                Czy na pewno chcesz usunąć folder <span className="font-semibold">"{props.folder?.folderName}"</span>?
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Ta operacja jest nieodwracalna.
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={props.closeModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Anuluj
              </button>
              <button
                onClick={() => {
                  if(folderToRemove.id===0){
                    toast.error("Nie można usunąć domyślnego folderu!");
                  }
                  else{
                    removeFolder({ folderToRemove: folderToRemove, userID: props.userID });
                    toast.success("Pomyślnie usunięto folder!");
                  }
                  props.closeModal();
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition-colors"
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      </Modal>
    )

}

export default RemoveConfirmModal;