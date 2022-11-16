import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ua from './assets/locales/ua/translation.json';
import ru from './assets/locales/ru/translation.json';

const resources = {
	ua,
	ru,
};

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		lng: 'ua',
		fallbackLng: 'ua',
		interpolation: { escapeValue: false },
		react: { useSuspense: false },
	});

export default i18n;
