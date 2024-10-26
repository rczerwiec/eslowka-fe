import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IParts{
    text: string;
  }

export interface IChatHistoryPart{
    role: any; 
    parts: IParts[]
}

export interface IChatHistory{
    object: IChatHistoryPart[];
}

const initialState: IChatHistory = {
    object: [],
}

export const chatHistorySlice = createSlice({
    name: "chatHistory",
    initialState: initialState,
    reducers: {
        change: (state, action: PayloadAction<{chatHistory: IChatHistoryPart[]}>) => {
            console.log("PAYLOAD:",action.payload.chatHistory)
            state.object = action.payload.chatHistory;
          },
    }
})

export const {change} = chatHistorySlice.actions;

export default chatHistorySlice.reducer;