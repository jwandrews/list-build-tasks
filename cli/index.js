#!/usr/bin/env node
'use strict';

const listBuildTasks = require( '../lib' );
const meow = require( 'meow' );

const cli = meow( `
  Usage
    $ list-tasks

  Options
    --gulp, -g Only check for gulp tasks
    --grunt, -G Only check for grunt tasks

  Examples
    $ list-tasks

    Gulp Build Tasks:
    • build
    • watch
    • serve
    • sass

    Grunt Build Tasks:
    • build
    • dev
    • sass
`, {
  alias: {
    g: 'gulp',
    G: 'grunt'
  }
});

if ( cli.flags.gulp ) {
  listBuildTasks( 'gulp', { path: process.cwd() });
} else if ( cli.flags.grunt ) {
  listBuildTasks( 'grunt', { path: process.cwd() });
} else {
  listBuildTasks( null, { path: process.cwd() });
}
