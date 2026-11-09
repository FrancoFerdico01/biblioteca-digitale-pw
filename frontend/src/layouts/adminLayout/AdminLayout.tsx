import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/sideBar/Sidebar";
import BottomLinks from "../../components/bottomLinks/BottomLinks";
import "./adminLayout.css";
import { MdCalendarMonth, MdLibraryBooks, MdOutlineDashboard, MdPeople } from "react-icons/md";
import { clearToken, getMe, getToken } from "../../services/api";

type AccessStatus = "checking" | "admin" | "not-admin" | "not-logged";

const AdminLayout = () => {
  const [status, setStatus] = useState<AccessStatus>("checking");

  useEffect(() => {
    if (!getToken()) {
      setStatus("not-logged");
      return;
    }
    getMe()
      .then((user) => setStatus(user.is_admin ? "admin" : "not-admin"))
      .catch(() => {
        // Token scaduto o non valido
        clearToken();
        setStatus("not-logged");
      });
  }, []);

  if (status === "checking") return null;
  if (status === "not-logged") return <Navigate to="/login" replace />;
  if (status === "not-admin") return <Navigate to="/" replace />;

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
