import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IWord{
    id: number,
    folderId: number,
    word: string,
    translation: string,
    note: string,
    repeated: number,
    known: number,
    streak: number,
    reverseStreak: number,
}

export interface INewWord{
    word: IWord,
    folderID: number,
}
export interface INewWords{
    words: IWord[],
    folderID: number,
}


export interface IFolder{
    id: number | any ;
    folderName: string | any;
    words: IWord[] | any;
    currentProgress: number;
    maxProgress: number;
}

const initialState: IFolder = {
    id: undefined,
    folderName: undefined,
    words: undefined,
    currentProgress: 0,
    maxProgress: 0,
}

export const folderSlice = createSlice({
    name: "folderProfile",
    initialState: initialState,
    reducers: {
        change: (state, action: PayloadAction<{id: number; folderName: string; words:IWord[], currentProgress: number, maxProgress: number}>) => {
            console.log(action.payload)
            state.id = action.payload.id;
            state.folderName = action.payload.folderName;
            state.words = action.payload.words;
            state.currentProgress = action.payload.currentProgress;
            state.maxProgress = action.payload.maxProgress;
          },
    }
})

export const {change} = folderSlice.actions;

export default folderSlice.reducer;