'use strict';

const path = require( 'path' );
const chalk = require( 'chalk' );
const hasTaskRunner = require( 'has-task-runner' );

const parseTaskFile = require( './parse-task-file' );
const { capitalize } = require( './Util' );

module.exports = ( runner, opts = {}) => {
  return new Promise(( resolve, reject ) => {
    if ( !runner ) {
      reject({ message: 'No task runner specified.' });
    }

    if ( !opts.path ) {
      reject({ message: 'No path specified.' });
    }

    hasTaskRunner( runner, opts.path )
      .then(( data ) => {
        if ( !data.runnerExists ) {
          reject({ message: `${capitalize( data.name )}file not found.` });
        }

        parseTaskFile( data.name, data.path )
          .then( resolve );
      })
      .catch( err => console.error( err ));
  });
};
