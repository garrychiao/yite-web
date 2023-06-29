import log from 'loglevel';

export function parseJson(string) {
  try {
    return JSON.parse(string);
  } catch {
    log.warn('parseJson:error', string);
    return string;
  }
}

export function toJson(value) {
  try {
    return JSON.stringify(value);
  } catch {
    log.warn('toJson:error', value);
    return String(value);
  }
}
