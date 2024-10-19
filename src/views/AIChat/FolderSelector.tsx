import Select from "react-select";
import { useFetchFolderQuery } from "../../shared/store";
import { useState } from "react";

interface IProps{
    text: string;
    options: any;
    userID: string;
    setFolder: (folder:any) => void;
}

interface SelectOptionType { label: string, value: string }

const FolderSelector = (props:IProps) => {
    const [folderName, setFolderName] = useState<string>("")
    const response = useFetchFolderQuery({folderName: folderName,userID: props.userID});

    if(response.isSuccess) {
        if(folderName !== ""){
            if(response.data.folderName){
                props.setFolder(response.data);
            }
        }

    }
    const changeValue = (option: SelectOptionType | null) => {
        if (option){
            setFolderName(option.value);
        }
    }


    return(
        <div >
            <label>{props.text}</label>
            <Select placeholder="Placeholder" options={props.options} onChange={changeValue}></Select>
        </div>
    )
}

export default FolderSelector;