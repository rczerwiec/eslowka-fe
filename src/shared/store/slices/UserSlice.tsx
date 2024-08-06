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
}

export interface IUserId{
    value: string,
}

const initialState: IUserId = {
  value: "b",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export const getCurrentUser = () => (dispatch: any) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;  
      
      dispatch(setCurrentUser(uid));
      console.log("User dispatched", uid);
    } else {
      console.log("Unable to get current user");
    }
  });
};

export default userSlice.reducer;