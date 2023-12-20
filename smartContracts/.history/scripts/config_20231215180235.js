const fs = require("fs").promises;

let config;

const initConfig = async () => {
  console.log(`Init config`);
  const readConfig = (await fs.readFile(`./config.json`)).toString();
  config = readConfig == "" ? {} : JSON.parse(readConfig).toString();
  return config;
};

const getConfig = () => config;

const setConfig = async (path, value) => {
  console.log("Before config", config);
  const splitPath = path.split(".").reverse();

  var ref = config;
  while (splitPath.length > 1) {
    let key = splitPath.pop();
    if (key) {
      if (!ref[key]) ref[key] = {};
      ref = ref[key];
    } else {
      return;
    }
  }

  let key = splitPath.pop();
  if (key) {
    ref[key] = value;
  }
};

const updateConfig = async () => {
  console.log("write: ", JSON.stringify(config));
  return await fs.writeFile("./config.json", JSON.stringify(config, null, 2));
};
module.exports = Config = {
  initConfig,
  getConfig,
  setConfig,
  updateConfig,
};
