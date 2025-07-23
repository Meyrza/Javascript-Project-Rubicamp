const weirdMultiply = (num) => {
  if (num < 10) return num;

  let result = num
  .toString()
  .split('')
  .reduce((acc, digit) => acc * Number(digit),)

  return weirdMultiply(result);
};

console.log(weirdMultiply(39))
console.log(weirdMultiply(999))
console.log(weirdMultiply(3))