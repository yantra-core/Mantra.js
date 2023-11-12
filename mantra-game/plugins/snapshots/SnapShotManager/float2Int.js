const float2Int = {};

float2Int.encode = function encodeFloatToInteger (value, precision) {
  if (typeof precision === 'undefined') {
    precision = 3;
  }
  if (typeof value === 'undefined' || value === null) {
    return null;
  }
  if (value === 0) {
    return 0;
  }
  //console.log('value', value)
  let x = value.toFixed(precision);
  //console.log('x', x)
  let y = Math.round(Number(x * (1000)));
  //console.log('y', y)
  return y;
}

float2Int.decode = function decodeFloatFromInteger (value, precision) {
  if (typeof precision === 'undefined') {
    precision = 3;
  }
  return value / 1000;
}

export default float2Int;