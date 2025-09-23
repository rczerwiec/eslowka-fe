import Select from "react-select";
import { useGetSingleFolderQuery } from "../../shared/store";
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
    const response = useGetSingleFolderQuery({folderName: folderName,userID: props.userID});

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
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">{props.text}</label>
            <Select 
                placeholder="Wybierz folder docelowy..." 
                options={props.options} 
                onChange={changeValue}
                styles={{
                    control: (base) => ({
                        ...base,
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '4px 8px',
                        boxShadow: 'none',
                        '&:hover': {
                            borderColor: '#3b82f6'
                        }
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: '#6b7280',
                        fontSize: '14px'
                    }),
                    menu: (base) => ({
                        ...base,
                        zIndex: 9999
                    }),
                    menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999
                    })
                }}
                menuPortalTarget={document.body}
            />
        </div>
    )
}

export default FolderSelector;