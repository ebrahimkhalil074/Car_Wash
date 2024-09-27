import { Outlet } from "react-router-dom";
import Navbar from "../ui/Home/Navbar";


const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
     <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;