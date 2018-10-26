const calculatFactorial = number => {
  const numbers = [];
  for (let i = 1n; i <= number; i++) {
    numbers.push(i);
  }

  return numbers.reduce((acc, val) => acc * val, 1n);
};

module.exports = calculatFactorial;
