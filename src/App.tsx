import { ReactNode, useEffect } from "react"
import SideBar from "./shared/components/UI/SideBar"
import NavBar from "./shared/components/UI/NavBar/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { RootState, useAppDispatch } from "./shared/store"
import { getCurrentUser } from "./shared/store/slices/UserSlice"
import { useNavigate } from "react-router-dom"

//toast imports
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    children: string | JSX.Element | JSX.Element[] | ReactNode
  }
  
  const App = ({children} : Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.userProfile);



    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch])

    console.log("TOKEN:",user.token)
    if(user.value === "b"){
        console.log("Nawiguje do strony z logowaniem")
        //navigate('/login')
    }

    return (
      <>
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