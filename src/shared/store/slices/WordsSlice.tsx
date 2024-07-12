import { createSlice } from "@reduxjs/toolkit";

export interface IWord{
    id: number,
    word: string,
    translation: string,
}

export interface IFolder{
    id: number;
    folderName: string;
    words: IWord[];
}

interface WordList{
    wordList: IWord[],
}

const initialState: WordList = {
    wordList: [],
}

const wordsSlice = createSlice({
    name: "words",
    initialState: initialState,
    reducers: {}
})

export default wordsSlice.reducer;