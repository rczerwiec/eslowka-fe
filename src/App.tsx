import FoldersPage from "./Components/FoldersPage";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar></NavBar>
      <div className="flex h-full">
          <SideBar></SideBar>
          <FoldersPage/>
      </div>
    </div>
  );
}

export default App;
