import Brand from "../brand/Brand";
import { Link } from "react-router-dom";
import CustomButton from "../customButton/CustomButton";
import LanguageSelector from "../languageSelector/LanguageSelector";
import { useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { clearToken } from "../../services/api";
import { useTranslation } from "react-i18next";

import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("sidebar");
  return (
    <>
      <aside className="sidebar">
        <Brand />
        <div className="sidebar-container">
        
          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              <li className="sidebar-item">
                <Link to="/dashboard"><MdOutlineDashboard />{t("dashboard")}</Link>
              </li>
              <li className="sidebar-item">
                <Link to="/dashboard/events"><MdCalendarMonth />{t("events")}</Link>
              </li>
              <li className="sidebar-item">
                <Link to="/dashboard/catalog"><MdLibraryBooks />{t("catalog")}</Link>
              </li>
              <li className="sidebar-item">
                <Link to="/dashboard/community"><MdPeople />{t("community")}</Link>
              </li>
            </ul>
          </nav>
          <div className="sidebar-footer">
            <CustomButton
              onClick={() => {
                clearToken();
                navigate("/login");
              }}
            >
              {t("logout")}
            </CustomButton>
            <div className="sidebar-user">{t("admin")}</div>
            <div className="sidebar-language">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
