import { FaBookOpenReader } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
    <div className="navbar-container">
      <div className="navbar-brand">
        <FaBookOpenReader className="navbar-icon" />
        <span className="navbar-title">BiblioHub</span>
      </div>
      <div className="navbar-links">
        <a href="/">Eventi & Visite</a>
        <a href="/about">Catalogo Libri</a>
        <a href="/contact">Le mie prenotazioni</a>
      </div>
      <div className="navbar-user">
        <button className="navbar-user-button">
          <IoPerson />
        </button>
      </div>
    </div>
    </nav>
  );
};

export default Navbar;