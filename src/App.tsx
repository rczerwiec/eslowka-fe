import FoldersPage from "./shared/components/FoldersPage";
import NavBar from "./shared/components/NavBar";
import SideBar from "./shared/components/SideBar";

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
