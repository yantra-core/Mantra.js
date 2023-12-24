import MemoryBackend from './MemoryBackend.js';

const storage = (function () {
  let backend = null;

  if (typeof window !== "undefined" && window.localStorage) {
    backend = window.localStorage;
  } else {
    backend = new MemoryBackend();
  }

  let prefix = 'mantra-';

  const setBackend = (newBackend) => {
    backend = newBackend;
  };

  const setPrefix = (newPrefix) => {
    prefix = newPrefix;
  };

  const clear = () => {
    backend.clear();
  };

  const set = (key, value) => {
    const stringValue = JSON.stringify(value);
    backend.setItem(prefix + key, stringValue);
  };

  const get = (key) => {
    const stringValue = backend.getItem(prefix + key);
    if (stringValue === null) {
      return null;
    }
    try {
      return JSON.parse(stringValue);
    } catch (e) {
      return stringValue;
    }
  };

  const getAllKeys = () => {
    const keys = [];
    for (let i = 0; i < backend.length; i++) {
      const key = backend.key(i);
      if (key.startsWith(prefix)) {
        keys.push(key.substring(prefix.length));
      }
    }
    return keys;
  };


  const getAllKeysWithData = () => {
    const keyDataPairs = {};
    for (let i = 0; i < backend.length; i++) {
      const key = backend.key(i);
      if (key && key.startsWith(prefix)) {
        const originalKey = key.substring(prefix.length);
        keyDataPairs[originalKey] = get(originalKey);
      }
    }
    return keyDataPairs;
  };


  // Expose public methods
  return {
    setBackend,
    setPrefix,
    clear,
    set,
    get,
    getAllKeys,
    getAllKeysWithData
  };
})();

export default storage;