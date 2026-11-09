import { FaBookOpenReader } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getMe, getToken, logout } from "../../services/api";
import Modal from "../modal/Modal";
import Brand from "../brand/Brand";
import LanguageSelector from "../languageSelector/LanguageSelector";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [initials, setInitials] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = getToken() !== null;
  const { t } = useTranslation("navbar");

  // Ricontrolla ad ogni cambio di pagina, così dopo il login compaiono le iniziali
  useEffect(() => {
    if (getToken() === null) {
      setInitials(null);
      return;
    }
    getMe()
      .then((me) =>
        setInitials(`${me.first_name[0]}${me.last_name[0]}`.toUpperCase()),
      )
      .catch(() => setInitials(null));
  }, [location.pathname]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleUserClick = () => {
    if (isLoggedIn) setMenuOpen((open) => !open);
    else openModal();
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setInitials(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {modalOpen && (
        <Modal
          onClose={closeModal}
          title={t("loginTitle")}
          paragraph={t("loginDescription")}
        />
      )}
      <div className="navbar-container">
        <Brand />
        <div className="navbar-links">
          <Link to="/">{t("common:home")}</Link>
          <a href="#events">{t("eventsAndVisits")}</a>
          <Link to="/Catalog">{t("bookCatalog")}</Link>
          {isLoggedIn && <Link to="/contact">{t("myBookings")}</Link>}
        </div>
        <div className="navbar-actions">
          <LanguageSelector />
          <div className="navbar-user">
            <button className="navbar-user-button" onClick={handleUserClick}>
              {initials ? (
                <span className="navbar-user-initials">{initials}</span>
              ) : (
                <IoPerson />
              )}
            </button>

            {menuOpen && (
              <div className="navbar-user-menu">
                <button
                  className="navbar-user-menu-item"
                  onClick={handleLogout}
                >
                  {t("common:logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
