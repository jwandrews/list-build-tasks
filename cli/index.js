#!/usr/bin/env node
'use strict';

const meow = require( 'meow' );

const command = require( './lib/listTasks' );

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
  command( 'gulp', { path: process.cwd() });
} else if ( cli.flags.grunt ) {
  command( 'grunt', { path: process.cwd() });
} else {
  command( null, { path: process.cwd() });
}
