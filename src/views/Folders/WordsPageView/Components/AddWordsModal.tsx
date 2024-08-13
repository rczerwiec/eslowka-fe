import { FC } from "react"
import AddWordsForm from "./AddWordsForm"
import { IFolder } from "../../../../shared/store/slices/FolderSlice"
import WordsActionModal from "../../../../shared/components/Modal/WordsActionModal"


const AddWordsModal: FC<{isVisible: boolean, closeModal: () => void, folder: IFolder, newID: number}> = (props): JSX.Element => {


return (
<WordsActionModal isVisible={props.isVisible} closeModal={props.closeModal} folder={props.folder} newID={props.newID} >
    <AddWordsForm folder={props.folder} newID={props.newID} closeModal={props.closeModal}/> 
</WordsActionModal>
)}

export default AddWordsModal;