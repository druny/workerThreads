const ora = require("ora");

module.exports = createSpinner = title =>
  ora({
    text: title,
    color: "green",
    spinner: {
      interval: 120,
      frames: ["▹▹▹▹▹", "▸▹▹▹▹", "▹▸▹▹▹", "▹▹▸▹▹", "▹▹▹▸▹", "▹▹▹▹▸"]
    }
  });
