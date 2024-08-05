import { ReactNode, useEffect } from "react"
import SideBar from "./shared/components/UI/SideBar"
import NavBar from "./shared/components/UI/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { RootState, useAppDispatch } from "./shared/store"
import { getCurrentUser } from "./shared/store/slices/UserSlice"
import { useNavigate } from "react-router-dom"

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

    console.log(user.value)
    if(user.value === "b"){
        console.log("Nawiguje do strony z logowaniem")
        navigate('/login')
    }

    return (
        <div className="flex flex-col h-screen">
        <NavBar></NavBar>
        <div className="flex h-full">
          <SideBar></SideBar>
          {children}
        </div>
      </div>
    )
  }

export default App;