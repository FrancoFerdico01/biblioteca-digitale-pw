import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonIt from "./locales/common/it.json";
import commonEn from "./locales/common/en.json";
import navbarIt from "../components/navbar/locales/it.json";
import navbarEn from "../components/navbar/locales/en.json";
import languageSelectorIt from "../components/languageSelector/locales/it.json";
import languageSelectorEn from "../components/languageSelector/locales/en.json";
import homeIt from "../pages/home/locales/it.json";
import homeEn from "../pages/home/locales/en.json";
import headerIt from "../components/header/locales/it.json";
import headerEn from "../components/header/locales/en.json";
import footerIt from "../components/footer/locales/it.json";
import footerEn from "../components/footer/locales/en.json";
import filterIt from "../components/filter/locales/it.json";
import filterEn from "../components/filter/locales/en.json";
import cardIt from "../components/card/locales/it.json";
import cardEn from "../components/card/locales/en.json";
import modalIt from "../components/modal/locales/it.json";
import modalEn from "../components/modal/locales/en.json";
import wrapperIt from "../components/wrapper/locales/it.json";
import wrapperEn from "../components/wrapper/locales/en.json";
import toastIt from "../components/toast/locales/it.json";
import toastEn from "../components/toast/locales/en.json";
import sidebarIt from "../components/sideBar/locales/it.json";
import sidebarEn from "../components/sideBar/locales/en.json";
import actionAdminIt from "../components/actionAdmin/locales/it.json";
import actionAdminEn from "../components/actionAdmin/locales/en.json";
import dashboardIt from "../pages/dashboard/locales/it.json";
import dashboardEn from "../pages/dashboard/locales/en.json";
import catalogIt from "../pages/catalog/locales/it.json";
import catalogEn from "../pages/catalog/locales/en.json";
import eventsIt from "../pages/events/locales/it.json";
import eventsEn from "../pages/events/locales/en.json";
import communityIt from "../pages/community/locales/it.json";
import communityEn from "../pages/community/locales/en.json";
import loginIt from "../pages/login/locales/it.json";
import loginEn from "../pages/login/locales/en.json";
import authLayoutIt from "../layouts/authLayout/locales/it.json";
import authLayoutEn from "../layouts/authLayout/locales/en.json";
import formIt from "../components/form/locales/it.json";
import formEn from "../components/form/locales/en.json";

const savedLanguage = localStorage.getItem("language") ?? "it";

i18n.use(initReactI18next).init({
  resources: {
    it: {
      common: commonIt,
      navbar: navbarIt,
      languageSelector: languageSelectorIt,
      home: homeIt,
      header: headerIt,
      footer: footerIt,
      filter: filterIt,
      card: cardIt,
      modal: modalIt,
      wrapper: wrapperIt,
      toast: toastIt,
      sidebar: sidebarIt,
      actionAdmin: actionAdminIt,
      dashboard: dashboardIt,
      catalog: catalogIt,
      events: eventsIt,
      community: communityIt,
      login: loginIt,
      authLayout: authLayoutIt,
      form: formIt,
    },
    en: {
      common: commonEn,
      navbar: navbarEn,
      languageSelector: languageSelectorEn,
      home: homeEn,
      header: headerEn,
      footer: footerEn,
      filter: filterEn,
      card: cardEn,
      modal: modalEn,
      wrapper: wrapperEn,
      toast: toastEn,
      sidebar: sidebarEn,
      actionAdmin: actionAdminEn,
      dashboard: dashboardEn,
      catalog: catalogEn,
      events: eventsEn,
      community: communityEn,
      login: loginEn,
      authLayout: authLayoutEn,
      form: formEn,
    },
  },
  lng: savedLanguage,
  fallbackLng: "it",
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => localStorage.setItem("language", lng));

export default i18n;
