const inquirer = require("inquirer");

const benchmark = require("./utils/benchmark");
const calculatFactorial = require("./utils/calculatFactorial");
const calculateFactorialWithWorker = require("./utils/calculateFactorialWithWorker");

const benchmarkFactorial = benchmark.factorial;

const run = async () => {
  const { inputNumber } = await inquirer.prompt([
    {
      type: "input",
      name: "inputNumber",
      message: "Calculate factorial for:",
      default: 10
    }
  ]);

  const timeWorker = await benchmarkFactorial(
    inputNumber,
    calculateFactorialWithWorker,
    "Worker"
  );
  const timeLocal = await benchmarkFactorial(
    inputNumber,
    calculatFactorial,
    "Local"
  );
  const diff = timeLocal - timeWorker;

  console.log(
    `Difference between local and worker: ${Math.floor(diff / 1000000)}ms`
  );
};

module.exports = { run };
