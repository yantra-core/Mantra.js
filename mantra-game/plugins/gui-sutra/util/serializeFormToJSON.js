export default function serializeFormToJSON(form) {
  let formData = new FormData(form);
  let obj = {};

  for (let [key, value] of formData) {
    let keys = key.split('.');
    keys.reduce((acc, k, i) => {
      if (i === keys.length - 1) {
        acc[k] = coerceType(value);
      } else {
        acc[k] = acc[k] || {};
      }
      return acc[k];
    }, obj);
  }

  return obj;
}

function coerceType(value) {
  // Convert 'true' or 'false' to boolean
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;

  // Convert string number to actual number but avoid NaN
  const number = Number(value);
  if (!isNaN(number) && number.toString() === value) {
    return number;
  }

  // Return the original string if no conversion is applicable
  return value;
}