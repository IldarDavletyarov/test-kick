export const MAX_FRACTION_DIGITS = 8;

export const SEPARATOR = '.';

const commaToDot = (v) => v.replace(',', SEPARATOR);

export const limitFractionDigits = (v) => {
  if (!v.includes(SEPARATOR)) {
    return v;
  }
  let split = v.split(SEPARATOR);
  let fraction = split[split.length - 1].slice(0, MAX_FRACTION_DIGITS);
  return [split.slice(0, split.length - 1), fraction].join(SEPARATOR);
}

export const transforms = [
  commaToDot,
  limitFractionDigits,
];

export const getFractions = (value) => {
  const valueString = value.toString();
  if (!valueString.includes(SEPARATOR)) {
    return 0;
  }
  const split = valueString.split(SEPARATOR);
  return split[split.length - 1].length;
}

const isNumber = (str) => {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str)) || str === ''
}

const isPositive = (v) => +v >= 0;

const isOnLimitFraction = (v) => getFractions(v) <= MAX_FRACTION_DIGITS

export const validations = [
  isNumber,
  isPositive,
  isOnLimitFraction,
];