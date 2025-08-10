import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appTitle: 'GLOBAL-SPHERE-AGRI-TECH',
      dashboard: 'Dashboard',
      marketplace: 'Marketplace',
      loading: 'Loading...',
      noResults: 'No results.'
    },
  },
  fr: {
    translation: {
      appTitle: 'GLOBAL-SPHERE-AGRI-TECH',
      dashboard: 'Tableau de bord',
      marketplace: 'Marché',
      loading: 'Chargement...',
      noResults: 'Aucun résultat.'
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;