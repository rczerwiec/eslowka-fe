import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebas";
import { useSelector } from "react-redux";
import { RootState } from "..";


export interface IUser{
    id: string,
    uid: string,
    userName: string,
    email: string,
    folders: [],
    settings: ISettings;
}

export interface ISettings {
  language: string;
  darkmode: boolean;
  wordsPerTraining: number;
}

export interface IUserId{
    value: string,
    token: string,
}

const initialState: IUserId = {
  value: "b",
  token: "b",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.value = action.payload;
    },
    setCurrentToken: (state, action) => {
      state.token = action.payload;
    }
  },
});

export const { setCurrentUser, setCurrentToken } = userSlice.actions;

export const getCurrentUser = () => (dispatch: any) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      user.getIdToken().then((token) => {
        dispatch(setCurrentToken(token))
        dispatch(setCurrentUser(user.uid));
      })
      
      console.log("User dispatched", );
    } else {
      console.log("Unable to get current user");
    }
  });
};

export default userSlice.reducer;