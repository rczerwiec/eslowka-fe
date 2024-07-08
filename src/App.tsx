import FoldersPage from "./views/Folders/FoldersPage";
import NavBar from "./shared/components/UI/NavBar";
import SideBar from "./shared/components/UI/SideBar";

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
