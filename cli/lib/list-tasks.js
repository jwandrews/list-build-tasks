"use strict";

const path = require("path");
const chalk = require("chalk");
const { isGrunt } = require("is-grunt");
const { isGulp } = require("is-gulp");

const listBuildTasks = require("../../lib");
const parseTaskFile = require("../../lib/parse-task-file");
const { capitalize } = require("../../lib/util");

const _listTasks = tasks => {
  tasks.map(task => {
    console.log(`${chalk.dim("•")} ${chalk.white(task)}`);
  });
};

const _parseAndList = (runnerName, pathToTaskFile) => {
  console.log(chalk.bold.white(`${capitalize(runnerName)} Tasks:`));
  parseTaskFile(runnerName, pathToTaskFile).then(_listTasks);
};

module.exports = (runner, opts = {}) => {
  let pathToCheck = opts.path;

  if (!runner) {
    isGulp(pathToCheck).then(isGulp =>
      isGulp
        ? _parseAndList("gulp", path.join(pathToCheck, "gulpfile.js"))
        : null
    );
    isGrunt(pathToCheck).then(isGrunt =>
      isGrunt
        ? _parseAndList("grunt", path.join(pathToCheck, "gruntfile.js"))
        : null
    );
    return;
  }

  listBuildTasks(runner, opts)
    .then(_listTasks)
    .catch(err => console.error(err));
};
