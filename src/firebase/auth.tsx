import { toast } from "react-toastify";
import { auth } from "./firebas";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, UserCredential } from "firebase/auth";


//Create user in Firebase
export const doCreateUserWithEmailAndPassword = async (email:string, password:string)=>{
    const user = await createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      sendEmailVerification(user.user);
      //console.log("pomyslnie")
      return user;
    })

    return user;
}

//Login using firebase
export const doSignInWithEmailAndPassword = async (email:string, password:string)=>{
    const user = await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential: UserCredential) => {
            //console.log("Zalogowano pomyslnie")
            return userCredential;
        }
    );

    return user;
}

//Register using google
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider).then(
        (userCredential: UserCredential) => {
            //console.log("Zalogowano pomyslnie przez Google!")
            return userCredential;
        }
    );

    return user;
}

//Sign out
export const doSignOut = () => {
    return auth.signOut();
}

export const doSendPasswordResetEmail= async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
}