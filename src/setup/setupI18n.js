import i18n from 'i18next';
import HttpAPI from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import config from './i18next.config';

const options = {
  // scanner output only support JSON v3 format
  // https://www.i18next.com/misc/json-format#i-18-next-json-v3
  compatibilityJSON: 'v3',
  // logs out more info (console)
  debug: false,

  // like feature flag, only supported langs can be loaded
  // supportedLngs: config.supportedLangs,
  supportedLngs: config.supportedLangs,
  // language to lookup key if not found on set language
  fallbackLng: config.defaultLang,
  // locale will be fully lower-cased eg. en-US --> en-us
  lowerCaseLng: true,
  // language codes to lookup, given set language is 'en-US':
  // 'all' --> ['en-US', 'en', 'dev']
  // 'currentOnly' --> 'en-US'
  // 'languageOnly' --> 'en'
  load: 'languageOnly',
  // array of languages to preload
  preload: [],

  // string or array of namespaces
  ns: config.namespaces,
  // default namespace used if not passed to translation function
  defaultNS: config.defaultNs,
  // char to separate keys
  keySeparator: config.keySeparator,
  // char to split namespace from key
  nsSeparator: config.nsSeparator,
  interpolation: config.interpolation,

  // do not allow empty string as valid translation
  returnEmptyString: false,

  // options for language detection
  // https://github.com/i18next/i18next-browser-languageDetector
  detection: {
    // order and from where user language should be detected
    order: ['localStorage'],
    // keys or params to lookup language from
    lookupLocalStorage: `${process.env.REACT_APP_STORAGE_PREFIX}:lng`,
    // cache user language on
    caches: ['localStorage'],
  },

  // options for backend
  // https://github.com/i18next/i18next-http-backend#backend-options
  backend: {
    // path where resources get loaded from
    loadPath: `${process.env.PUBLIC_URL}/i18n/{{lng}}/{{ns}}.json`,
    // your backend server supports multiloading
    // /locales/resources.json?lng=de+en&ns=ns1+ns2
    allowMultiLoading: false,
    // allow cross domain requests
    crossDomain: false,
    // adds parameters to resource URL, use it to prevent cached
    queryStringParams: { v: '0.0.0' },
  },
};

/**
 * @param customizedOption
 * @return {Promise}
 */
const setupI18n = (customizedOption = {}) =>
  i18n
    .use(HttpAPI)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...options,
      ...customizedOption,
    });

export default setupI18n;
