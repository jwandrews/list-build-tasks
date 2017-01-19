'use strict';

const fs = require( 'fs' );
const path = require( 'path' );
const grep = require( 'grepit' );

const _pushTasks = ( sourceList, destination ) => {
  sourceList.map(( item ) => {
    destination.push( item.split( '\'' )[1]);
  });
};

module.exports = function( taskRunner, pathToTaskFile ) {
  return new Promise(( resolve, reject ) => {
    let tasks = [];

    switch ( taskRunner ) {
      case 'grunt': {
        // grep the taskfile for tasks
        let results = grep( 'grunt.registerTask', pathToTaskFile );

        // Push results onto task array
        _pushTasks( results, tasks );
        break;
      }

      case 'gulp': {
        // grep the taskfile for tasks
        let results = grep( 'gulp.task', pathToTaskFile );

        // grep the taskfile for directory require statement
        let requireDirFound = grep( 'requireDir', pathToTaskFile );

        // If gulpfile is requiring a directory rather than listing tasks
        if ( requireDirFound.length >= 1 ) {
          console.log( 'Listing directory tasks.' );

          // Filter results for line that includes directory require statement
          const stringIncludesDirectory = requireDirFound.filter(( item ) => {
            return item.indexOf( 'requireDir(' ) !== -1;
          });

          // Store the directory that task file requires
          let gulpDirectory = path.join( pathToTaskFile, '..', stringIncludesDirectory.join().split( '\'' )[1]);

          // Push directory tasks onto task array
          fs.readdirSync( gulpDirectory ).map( task => {
            // Check if task is a file with a js extension
            // and remove it for display, else push task name
            if ( task.indexOf( '.js' ) !== -1 ) {
              tasks.push( task.substr( 0, task.length - 3 ));
            } else {
              tasks.push( task );
            }
          });
          break;
        }

        // Push results onto task array
        _pushTasks( results, tasks );
        break;
      }

      default: {
        // Reject if no task runner is specified
        reject({ message: 'No task runner specified.' });
      }
    }

    // Resolve with array of tasks
    resolve( tasks );
  });
};
