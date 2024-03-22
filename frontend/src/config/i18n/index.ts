import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { es, en } from "@locales/index";

i18n.use(initReactI18next).init({
  resources: { es, en },
  lng: "es",
  fallbackLng: "es",
  ns: ["translations"],
  defaultNS: "translations",
});
