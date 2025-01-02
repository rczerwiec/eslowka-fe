import { ReactNode, useEffect, useState } from "react"
import SideBar from "./shared/components/UI/SideBar"
import NavBar from "./shared/components/UI/NavBar/NavBar"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "./shared/store"
import { getCurrentUser } from "./shared/store/slices/UserSlice"

//toast imports
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth"

type Props = {
    children: string | JSX.Element | JSX.Element[] | ReactNode
  }
  
  const App = ({children} : Props) => {
     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const user = useSelector((state: RootState) => state.userProfile);

    console.log(user.userLoggedIn)
    useEffect(() => {
        dispatch(getCurrentUser());
        const auth = getAuth();
      
        const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
          if (loggedUser) {
            // User is signed in
          } else {
            navigate("/login") 
            toast.error("Pierw musisz się zalogować!")// No user is signed in
          }
          setLoading(false); // Finished checking auth state
        });
    
        return () => unsubscribe(); 
    }, [dispatch])

    //console.log("TOKEN:",user.token)
    if(user.value === "b"){
        //navigate('/login')
    }

    return (
      <>
        {!user.userLoggedIn && (<Navigate to={'/login'} replace={true}/> )}
        <div className="flex flex-col h-screen">
        <NavBar></NavBar>
        <div className="flex h-full">
          <SideBar></SideBar>
          {children}
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </>
    )
  }

export default App;