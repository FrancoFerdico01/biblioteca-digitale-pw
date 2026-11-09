import { FaBookOpenReader } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getMe, getToken, logout } from "../../services/api";
import Modal from "../modal/Modal";
import Brand from "../brand/Brand";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [initials, setInitials] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = getToken() !== null;

  // Ricontrolla ad ogni cambio di pagina, così dopo il login compaiono le iniziali
  useEffect(() => {
    if (getToken() === null) {
      setInitials(null);
      return;
    }
    getMe()
      .then((me) => setInitials(`${me.first_name[0]}${me.last_name[0]}`.toUpperCase()))
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
          title="Accedi al tuo profilo o crea un account!"
          paragraph="Entra nel tuo profilo o registrati per accedere a tutti i contenuti e interagire con gli altri membri della community."
        />
      )}
      <div className="navbar-container">
        <Brand />
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <a href="#events">Eventi & Visite</a>
          <Link to="/Catalog">Catalogo Libri</Link>
          {isLoggedIn && <Link to="/contact">Le mie prenotazioni</Link>}
        </div>
        <div className="navbar-user">
          <button className="navbar-user-button" onClick={handleUserClick}>
            {initials ? <span className="navbar-user-initials">{initials}</span> : <IoPerson />}
          </button>
          {menuOpen && (
            <div className="navbar-user-menu">
              <button className="navbar-user-menu-item" onClick={handleLogout}>
                Esci
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
