import { FC } from "react"
import { IFolder, IWord } from "../../../../shared/store/slices/FolderSlice"
import UpdateWordForm from "./UpdateWordForm"
import WordsActionModal from "../../../../shared/components/Modal/WordsActionModal"


const UpdateWordsModal: FC<{isVisible: boolean, closeModal: () => void, folder: IFolder, newID: number, currentWord: IWord | undefined}> = (props): JSX.Element => {

return (
<WordsActionModal isVisible={props.isVisible} closeModal={props.closeModal} folder={props.folder} newID={props.newID} >
    <UpdateWordForm folder={props.folder} newID={0} closeModal={props.closeModal} currentWord={props.currentWord}/>
</WordsActionModal>
)}

export default UpdateWordsModal;