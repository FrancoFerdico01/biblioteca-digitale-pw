import { MdAccessTime, MdOutlineEmail, MdOutlineMessage } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import {
  FaBookOpenReader,
  FaFacebook,
  FaInstagram,
  FaLocationDot,
  FaTwitter,
} from "react-icons/fa6";
import "./footer.css";
import { TbWorld } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-opening-title">
            <MdAccessTime className="footer-opening-icon" />{" "}
            <h3>Orari di Apertura</h3>
          </div>
          <ul className="footer-ul-opening">
            <li className="footer-li-opening">
              <span className="footer-opening-day">Lunedì - Venerdì:</span>
              <span className="footer-opening-hour">09:00 - 18:00</span>
            </li>
            <li className="footer-li-opening">
              <span className="footer-opening-day">Sabato:</span>
              <span className="footer-opening-hour">09:00 - 13:00</span>
            </li>
            <li className="footer-li-opening">
              <span className="footer-opening-day">Domenica:</span>
              <span className="footer-opening-hour">Chiuso</span>
            </li>
          </ul>
        </div>
        <div className="footer-content">
          <div className="footer-contacts-title">
            <FiPhone className="footer-contacts-icon" />
            <h3>Contatti Diretti</h3>
          </div>
          <ul className="footer-ul-contacts">
            <li className="footer-li-contacts">
              <FaLocationDot /> Piazza dell'Ateneo Civico 4, (PA)
            </li>
            <li className="footer-li-contacts">
              <MdOutlineEmail /> info@bibliotecadigitale.it
            </li>
            <li className="footer-li-contacts">
              <MdOutlineMessage />
              Assistenza: +39 091 1234567
            </li>
          </ul>
        </div>
        <div className="footer-content">
          <div className="footer-social-title">
            <TbWorld className="footer-social-icon" />
            <h3>Seguici sui Social</h3>
          </div>
          <ul className="footer-ul-social">
            <li className="footer-li-social">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-li-social-a"
              >
                <FaFacebook /> Facebook
              </a>
            </li>
            <li className="footer-li-social">
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-li-social-a"
              >
                <FaTwitter /> Twitter
              </a>
            </li>
            <li className="footer-li-social">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-li-social-a"
              >
                <FaInstagram /> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-brand">
          <FaBookOpenReader className="footer-brand-icon" />
          <span className="footer-brand-title">BiblioHub</span>
        </div>
         <span className="footer-brand-description">
            Rete bibliotecaria civica
          </span>
        <p className="footer-bottom-text">&copy; 2025 Biblioteca Digitale. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
};

export default Footer;
