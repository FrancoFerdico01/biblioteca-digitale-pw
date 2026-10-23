import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sideBar/Sidebar";
import "./adminLayout.css";

const AdminLayout = () => {
  return (
    <>
      <Sidebar />
      <main className="admin-layout-main">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
