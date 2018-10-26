const path = require("path");
const { Worker, workerData } = require("worker_threads");

const workerPath = path.resolve(__dirname, "./factorialWorker.js");

const promisifiedWorker = workerData =>
  new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, { workerData });

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", code => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });

module.exports = promisifiedWorker;
