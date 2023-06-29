module.exports = {
  languages: ['en', 'zh'],
  supportedLangs: ['en', 'zh'],
  defaultLang: 'zh',
  // default namespace used if not passed to translation function
  defaultNs: 'common',
  namespaces: [
    'common', // default
  ],
  // char to split namespace from key
  nsSeparator: '::',
  // char to separate keys, if working with a flat json, it's recommended to set keySeparator to false
  // https://www.i18next.com/overview/configuration-options
  keySeparator: false,
  interpolation: {
    prefix: '{{',
    suffix: '}}',
    escapeValue: false,
  },
};
