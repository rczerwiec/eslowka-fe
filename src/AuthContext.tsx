import {auth} from "./firebase/firebas";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useCreateUserMutation } from "./shared/store";
import { IUser } from "./shared/store/slices/UserSlice";

export const doSignInWithEmailAndPassword = async (email: string, password: string)=>{
    return signInWithEmailAndPassword(auth, email, password);
}