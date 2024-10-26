import { ReactNode, useEffect } from "react"
import SideBar from "./shared/components/UI/SideBar"
import NavBar from "./shared/components/UI/NavBar/NavBar"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "./shared/store"
import { getCurrentUser } from "./shared/store/slices/UserSlice"

//toast imports
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom"

type Props = {
    children: string | JSX.Element | JSX.Element[] | ReactNode
  }
  
  const App = ({children} : Props) => {
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.userProfile);

    console.log(user.userLoggedIn)
    useEffect(() => {
        dispatch(getCurrentUser());
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