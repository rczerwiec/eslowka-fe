import { HiPlus } from "react-icons/hi";

const FoldersPage = () => {
    return(
        <div className="flex flex-col w-full h-full">
            <div className="flex pl-4 bg-fourth h-8  items-center
                            text-fifth text-sm font-medium">
                Foldery
            </div>
            <div className="flex pl-4 h-20 items-center
                            text-black text-3xl font-medium">
                [FolderName]
            </div>
            <div className="flex pl-4 h-20 items-center
                            text-black text-3xl font-medium">
                TABELA
            </div>
            <div className="flex absolute bottom-0 right-0 m-8 h-16 w-16 bg-secondary hover:bg-third rounded-full shadow-md items-center justify-center">
                <HiPlus className="text-2xl"/>
            </div>
        </div>
    )
}

export default FoldersPage;