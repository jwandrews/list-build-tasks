'use strict';

const path = require( 'path' );
const test = require( 'ava' );
const m = require( '../lib' );

test( 'grunt > path in object', t => {
  t.plan( 1 );
  return m( 'grunt', { path: path.join( __dirname, 'fixtures/grunt' ) })
    .then( tasks => {
      return t.truthy( tasks );
    });
});

test( 'gulp > path in object', t => {
  t.plan( 1 );
  return m( 'gulp', { path: path.join( __dirname, 'fixtures/gulp' ) })
    .then( tasks => {
      return t.truthy( tasks );
    });
});

test( 'gulp > path as string', t => {
  t.plan( 1 );
  return m( 'gulp', path.join( __dirname, 'fixtures/gulp' ))
    .then( tasks => {
      return t.truthy( tasks );
    });
});
