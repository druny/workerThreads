const os = require("os");

const promisifiedWorker = require("./promisifiedWorker");

const userCPUCount = os.cpus().length;

const calculateFactorialWithWorker = number => {
  if (number === 0) return 1;

  return new Promise(async (parentResolve, parentReject) => {
    const numbers = [];

    for (let i = 1n; i <= number; i++) {
      numbers.push(i);
    }

    const segmentSize = Math.ceil(numbers.length / userCPUCount);
    const segments = [];

    console.log(numbers.length, userCPUCount, segmentSize);

    for (let segmentIndex = 0; segmentIndex < userCPUCount; segmentIndex++) {
      const start = segmentIndex * segmentSize;
      const end = start + segmentSize;
      const segment = numbers.slice(start, end);

      segments.push(segment);
    }

    try {
      const results = await Promise.all(
        segments.map(segment => promisifiedWorker(segment))
      );

      const finalResult = results.reduce((acc, val) => acc * val, 1n);

      parentResolve(finalResult);
    } catch (e) {
      parentReject(e);
    }
  });
};

module.exports = calculateFactorialWithWorker;
