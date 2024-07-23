import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IWord{
    id: number,
    folderId: number,
    word: string,
    translation: string,
    repeated: number,
    known: number,
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
}

const initialState: IFolder = {
    id: undefined,
    folderName: undefined,
    words: undefined,
}

export const folderSlice = createSlice({
    name: "folderProfile",
    initialState: initialState,
    reducers: {
        change: (state, action: PayloadAction<{id: number; folderName: string; words:IWord[]}>) => {
            console.log(action.payload)
            state.id = action.payload.id;
            state.folderName = action.payload.folderName;
            state.words = action.payload.words;
          },
    }
})

export const {change} = folderSlice.actions;

export default folderSlice.reducer;