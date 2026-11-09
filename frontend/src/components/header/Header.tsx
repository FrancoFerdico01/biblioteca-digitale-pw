import { PiBookOpenText } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import "./header.css";

const Header = () => {
  const { t } = useTranslation("header");
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-icon-text">
            <PiBookOpenText size={16} />
            <p>{t("tagline")}</p>
          </div>
          <h1>{t("title")}</h1>
          <p className="header-paragraph">
            {t("description")}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
