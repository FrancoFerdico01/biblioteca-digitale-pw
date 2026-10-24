import Brand from "../brand/Brand";
import { Link } from "react-router-dom";
import CustomButton from "../customButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { MdPeople } from "react-icons/md";

import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <>
      <aside className="sidebar">
        <Brand />
        <div className="sidebar-container">
        
          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              <li className="sidebar-item">
                <Link to="/dashboard"><MdOutlineDashboard />Dashboard</Link>
              </li>
              <li className="sidebar-item">
                <Link to="/dashboard/events"><MdCalendarMonth />Eventi</Link>
              </li>
              <li className="sidebar-item">
                <Link to="/dashboard/catalog"><MdLibraryBooks />Catalogo Libri</Link>
              </li>
              <li className="sidebar-item">
                <Link to="/dashboard/community"><MdPeople />Community</Link>
              </li>
            </ul>
          </nav>
          <div className="sidebar-footer">
            <CustomButton
              onClick={() => {
                navigate("/");
              }}
            >
              Logout
            </CustomButton>
            <div className="sidebar-user">NOME UTENTE</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
