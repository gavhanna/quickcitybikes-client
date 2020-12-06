export const prefixZero = (num) => {
  const newNum = parseInt(num);

  return newNum >= 10 ? newNum : `0${newNum}`;
};
