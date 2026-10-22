import { FaBookOpenReader } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { useState } from "react";
import "./navbar.css";
import Modal from "../modal/Modal";
import Brand from "../brand/Brand";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <nav className="navbar">
      {modalOpen && <Modal onClose={closeModal} title="Accedi al tuo profilo o crea un account!" paragraph="Entra nel tuo profilo o registrati per accedere a tutti i contenuti e interagire con gli altri membri della community." />}
      <div className="navbar-container">
        <Brand />
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="#events">Eventi & Visite</a>
          <a href="/Catalog">Catalogo Libri</a>
          <a href="/contact">Le mie prenotazioni</a>
        </div>
        <div className="navbar-user">
          <button className="navbar-user-button" onClick={openModal}>
            <IoPerson />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
