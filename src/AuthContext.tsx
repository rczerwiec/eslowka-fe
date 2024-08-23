import {auth} from "./firebase/firebas";
import { signInWithEmailAndPassword } from "firebase/auth";

export const doSignInWithEmailAndPassword = async (email: string, password: string)=>{
    return signInWithEmailAndPassword(auth, email, password);
}