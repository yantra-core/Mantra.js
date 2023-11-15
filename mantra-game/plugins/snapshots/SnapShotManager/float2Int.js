const float2Int = {
  encode(value, precision = 3) {
    if (value === null || typeof value === 'undefined') {
      return null;
    }
    if (value === 0) {
      return 0;
    }
    return Math.round(value * Math.pow(10, precision));
  },

  decode(value, precision = 3) {
    return this.truncateToPrecision(value / 1000, precision);
  },

  truncateToPrecision(value, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }
};

export default float2Int;
