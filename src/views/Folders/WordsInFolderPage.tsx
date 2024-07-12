import { HiPlus } from "react-icons/hi";
import { useFetchWordsQuery } from "../../shared/store";
import { IWord } from "../../shared/store/slices/WordsSlice";
import character1 from "../../shared/img/character1.svg";
import React from "react";


const WordsInFolderPage = () => {
    const response = useFetchWordsQuery("");

    let renderedWords;
    if (response.isLoading) {
        renderedWords = (
        <div>Ładowanie...</div>
      );
    } else if (response.isError) {
        renderedWords = <div>Error</div>;
    } else if (response.isSuccess) {
        renderedWords = response.data.map((word: IWord, index: number) => {
        let tr = <tr className="h-14" key={word.id}>
                            <th>{word.id}</th>
                <th>{word.word}</th>
                <th>{word.translation}</th>
                <th>...</th>
        </tr>
        if (index % 2 === 0) {tr = <tr className="h-14 bg-fourth" key={word.id}>
                <th className="border-r-4 border-white">{word.id}</th>
                <th className="border-r-4 border-white">{word.word}</th>
                <th className="border-r-4 border-white">{word.translation}</th>
                <th>...</th>
            </tr>}
        return (
            <>
            {tr}
          </>
        );
      });
    }

    return(
        <>
        <div className="flex flex-col w-full h-full">
            <div className="flex pl-4 bg-fourth h-8  items-center
                            text-fifth text-sm font-medium">
                Foldery
            </div>
            <div className="flex pl-4 h-20 items-center
                            text-black text-3xl font-medium">
                Foldery
            </div>
            <div className="flex flex-col pl-4 h-20 items-left
                            text-black text-3xl font-medium">
                <div className="flex flex-col w-3/4 shadow-lg justify-center">
                <table >
        <tr className="bg-secondary h-14 text-white ">
            <th className="rounded-tl-xl border-r-4 border-white">ID</th>
            <th className="border-r-4 border-white">Słowo</th>
            <th className="border-r-4 border-white">Tłumaczenie</th>
            <th className="rounded-tr-xl">...</th>    
        </tr>
        {renderedWords}
    </table>
                </div>
            </div>
            <div className="flex z-10 absolute bottom-0 right-0 m-8 h-16 w-16 bg-secondary hover:bg-third rounded-full shadow-md items-center justify-center">
                <HiPlus className="text-2xl"/>
            </div>
            
        </div>
        <img alt="character1" className="absolute z-0 w-1/5 bottom-0 right-0" src={character1}></img>
        </>
    )
}



export default WordsInFolderPage;