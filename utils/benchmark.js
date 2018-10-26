const ora = require("ora");

const createSpinner = require("./spinner");

const NS_PER_SEC = 1e9;

const factorial = async (inputNumber, factFun, label) => {
  const spinner = ora(`Calculating with ${label}..`).start();
  const startTime = process.hrtime();

  const result = await factFun(BigInt(inputNumber));

  const diffTime = process.hrtime(startTime);
  const time = diffTime[0] * NS_PER_SEC + diffTime[1];

  spinner.succeed(`${label} result done in: ${time}`);

  return time;
};

module.exports = { factorial };
