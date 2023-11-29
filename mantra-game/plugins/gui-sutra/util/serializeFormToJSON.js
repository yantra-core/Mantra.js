export default function serializeFormToJSON(form) {
  let formData = new FormData(form);
  let obj = {};
  for (let [key, value] of formData) {
    let keys = key.split('.');
    keys.reduce((acc, k, i) => {
      if (i === keys.length - 1) {
        acc[k] = value;
      } else {
        acc[k] = acc[k] || {};
      }
      return acc[k];
    }, obj);
  }
  return obj;
}