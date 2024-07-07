import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar></NavBar>
      <div className="flex h-full">
          <SideBar></SideBar>
          <div>MAIN</div>
      </div>
    </div>
  );
}

export default App;
