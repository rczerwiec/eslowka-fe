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
    defaultVoice: string;
    defaultVoiceReversed: string;
    referenceID: string;
    isShared: boolean;
    folderLanguage: string;
    sharedCounter: number;
    authorID: string | any;
  
}

const initialState: IFolder = {
    id: undefined,
    folderName: undefined,
    words: undefined,
    currentProgress: 0,
    maxProgress: 0,
    defaultVoice: "Microsoft Ryan Online (Natural) - English (United Kingdom)",
    defaultVoiceReversed: "Microsoft Ryan Online (Natural) - English (United Kingdom)",
    referenceID: "",
    isShared: false,
    folderLanguage: "English",
    sharedCounter: 0,
    authorID: undefined,
 
}

export const folderSlice = createSlice({
    name: "folderProfile",
    initialState: initialState,
    reducers: {
        change: (state, action: PayloadAction<{id: number; folderName: string; words:IWord[], currentProgress: number, maxProgress: number, defaultVoice:string,defaultVoiceReversed:string, referenceID:string, isShared:boolean, folderLanguage:string, sharedCounter: number, authorID:string }>) => {
            state.id = action.payload.id;
            state.folderName = action.payload.folderName;
            state.words = action.payload.words;
            state.currentProgress = action.payload.currentProgress;
            state.maxProgress = action.payload.maxProgress;
            state.defaultVoice = action.payload.defaultVoice;
            state.defaultVoiceReversed = action.payload.defaultVoiceReversed;
            state.referenceID = action.payload.referenceID;
            state.isShared = action.payload.isShared;
            state.folderLanguage = action.payload.folderLanguage;
            state.sharedCounter = action.payload.sharedCounter;
            state.authorID = action.payload.authorID
          },
    }
})

export const {change} = folderSlice.actions;

export default folderSlice.reducer;