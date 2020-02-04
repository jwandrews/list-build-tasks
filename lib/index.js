"use strict";

const hasTaskRunner = require("has-task-runner");

const parseTaskFile = require("./parse-task-file");
const { capitalize } = require("./util");

module.exports = (runner, opts) => {
  let path = typeof opts === "string" ? opts : opts.path;

  return new Promise((resolve, reject) => {
    if (!runner) {
      reject({ message: "No task runner specified." });
    }

    if (!path) {
      reject({ message: "No path specified." });
    }

    hasTaskRunner(runner, { path })
      .then(data => {
        if (!data.runnerExists) {
          reject({ message: `${capitalize(data.name)}file not found.` });
        }

        parseTaskFile(data.name, data.path).then(resolve);
      })
      .catch(err => console.error(err));
  });
};
