import { MdAccessTime, MdOutlineEmail, MdOutlineMessage } from "react-icons/md";
import { useState } from "react";

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
import CustomButton from "../customButton/CustomButton";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import Modal from "../modal/Modal";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation("footer");
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-opening-title">
            <MdAccessTime className="footer-opening-icon" />{" "}
            <h3>{t("openingHours")}</h3>
          </div>
          <ul className="footer-ul-opening">
            <li className="footer-li-opening">
              <span className="footer-opening-day">{t("weekdays")}</span>
              <span className="footer-opening-hour">09:00 - 18:00</span>
            </li>
            <li className="footer-li-opening">
              <span className="footer-opening-day">{t("saturday")}</span>
              <span className="footer-opening-hour">09:00 - 13:00</span>
            </li>
            <li className="footer-li-opening">
              <span className="footer-opening-day">{t("sunday")}</span>
              <span className="footer-opening-hour">{t("closed")}</span>
            </li>
          </ul>
        </div>
        <div className="footer-content">
          <div className="footer-contacts-title">
            <FiPhone className="footer-contacts-icon" />
            <h3>{t("contacts")}</h3>
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
              {t("assistance")}
            </li>
          </ul>
        </div>
        <div className="footer-content">
          <div className="footer-social-title">
            <TbWorld className="footer-social-icon" />
            <h3>{t("social")}</h3>
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
            {t("description")}
          </span>
        <p className="footer-bottom-text">{t("copyright")}</p>
        <CustomButton onClick={() => setOpenModal(true)}>
          <RiGitRepositoryPrivateLine /> {t("reservedArea")}
        </CustomButton>
      </div>
      {openModal && (
        <Modal
          title={t("reservedArea")}
          paragraph={t("adminOnly")}
          adminLogin
          onClose={() => setOpenModal(false)}
        />
      )}
    </footer>
  );
};

export default Footer;
