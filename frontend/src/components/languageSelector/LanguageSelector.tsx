import { useTranslation } from "react-i18next";
import "./languageSelector.css";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation("languageSelector");

  return (
    <select
      className="language-selector"
      aria-label={t("languageLabel")}
      value={i18n.resolvedLanguage ?? i18n.language}
      onChange={(event) => {
        void i18n.changeLanguage(event.target.value);
      }}
    >
      <option value="it">IT</option>
      <option value="en">EN</option>
    </select>
  );
};

export default LanguageSelector;
