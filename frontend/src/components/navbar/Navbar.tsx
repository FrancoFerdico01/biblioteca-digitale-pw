import { FaBookOpenReader } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaBookOpenReader className="navbar-icon" />
        <span className="navbar-title">BiblioHub</span>
      </div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
      <div className="navbar-user">
        <button>
          <IoPerson />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;