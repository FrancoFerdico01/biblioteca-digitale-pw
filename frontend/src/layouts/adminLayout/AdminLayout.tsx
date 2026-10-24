import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sideBar/Sidebar";
import BottomLinks from "../../components/bottomLinks/BottomLinks";
import "./adminLayout.css";
import { MdCalendarMonth, MdLibraryBooks, MdOutlineDashboard, MdPeople } from "react-icons/md";

const AdminLayout = () => {
  return (
    <>
      <Sidebar />
      <main className="admin-layout-main">
        <Outlet />
      </main>
      <BottomLinks 
        route_1="/dashboard"
        route_2="/dashboard/events"
        route_3="/dashboard/catalog"
        route_4="/dashboard/community"
        icon_1={<MdOutlineDashboard />}
        icon_2={<MdCalendarMonth />}
        icon_3={<MdLibraryBooks />}
        icon_4={<MdPeople />}
      />
    </>
  );
};

export default AdminLayout;
