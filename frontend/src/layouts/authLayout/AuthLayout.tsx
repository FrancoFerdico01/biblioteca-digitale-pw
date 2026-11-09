import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import "./authLayout.css";
import Brand from "../../components/brand/Brand";
import { BsBookmarkCheck } from "react-icons/bs";
import { MdCalendarMonth, MdLibraryBooks } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import BottomLinks from "../../components/bottomLinks/BottomLinks";
import { useTranslation } from "react-i18next";

const AuthLayout: React.FC = () => {
  const { t } = useTranslation("authLayout");
  return (
    <>
      <Navbar />
      <main className="auth-layout-main">
        <div className="auth-layout-container">
          <div className="auth-layout-sidebar">
            <div className="auth-layout-sidebar-content">
              <Brand />
              <h1 className="auth-layout-sidebar-title">{t("title")}</h1>
              <p className="auth-layout-sidebar-text">
                {t("description")}
              </p>
            </div>
          </div>
          <div className="auth-layout-content">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
         <BottomLinks 
        route_1="/"
        route_2="/#events"
        route_3="/"
        route_4="/#booking"
        icon_1={<IoMdHome />}
        icon_2={<MdCalendarMonth />}
        icon_3={<MdLibraryBooks />}
        icon_4={<BsBookmarkCheck />}
      />
    </>
  );
};

export default AuthLayout;
