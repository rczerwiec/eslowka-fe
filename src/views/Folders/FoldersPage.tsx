import { HiPlus } from "react-icons/hi";
import { useFetchWordsQuery } from "../../shared/store";
import { IWord } from "../../shared/store/slices/WordsSlice";


const FoldersPage = () => {
    const response = useFetchWordsQuery("");

    let renderedWords;
    if (response.isLoading) {
        renderedWords = (
        <div>Ładowanie...</div>
      );
    } else if (response.isError) {
        renderedWords = <div>Error</div>;
    } else if (response.isSuccess) {
        renderedWords = response.data.map((word: IWord) => {
        return (
          <div key={word.id}>
            {word.word} - {word.translation}
          </div>
        );
      });
    }

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
            <div className="flex flex-col pl-4 h-20 items-center
                            text-black text-3xl font-medium">
                TABELA
                <div>
                    {renderedWords}
                </div>
            </div>
            <div className="flex absolute bottom-0 right-0 m-8 h-16 w-16 bg-secondary hover:bg-third rounded-full shadow-md items-center justify-center">
                <HiPlus className="text-2xl"/>
            </div>
        </div>
    )
}

export default FoldersPage;