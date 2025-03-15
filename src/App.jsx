import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
