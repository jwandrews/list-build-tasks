'use strict';

const fs = require( 'fs' );
const path = require( 'path' );
const grep = require( 'shelljs' ).grep;

module.exports = function( taskRunner, pathToTaskFile ) {
  return new Promise(( resolve, reject ) => {
    let tasks = [];

    switch ( taskRunner ) {
      case 'grunt': {
        const grepTaskFile = grep( 'grunt.registerTask', pathToTaskFile ).stdout.split( ' ' );

        for ( let i = 0; i < grepTaskFile.length; i++ ) {
          if ( grepTaskFile[i] === 'grunt.registerTask(' ) {
            tasks.push( grepTaskFile[ i + 1 ]);
          }
        }

        tasks = tasks.map( task => {
          return task.split( '' ).filter( char => {
            if ( !( char === ',' || char === '\'' )) {
              return true;
            }
          }).join( '' );
        });

        break;
      }

      case 'gulp': {
        const grepTaskFile = grep( 'gulp.task', pathToTaskFile ).stdout.split( ' ' );
        const requireDir = grepTaskFile.indexOf( "subfolders\nrequireDir('./gulp/tasks'," );

        if ( requireDir !== -1 ) {
          const directoryTaskFiles = fs.readdirSync( path.join( pathToTaskFile, '../gulp/tasks' ));
          directoryTaskFiles.map( task => {
            if ( task.indexOf( '.js' ) !== -1 ) {
              tasks.push( task.substr( 0, task.length - 3 ));
            } else {
              tasks.push( task );
            }
          });

          resolve( tasks );
        }

        for ( let i = 0; i < grepTaskFile.length; i++ ) {
          if ( grepTaskFile[i].indexOf( 'gulp.task(' ) !== -1 ) {
            tasks.push( grepTaskFile[ i + 1 ]);
          }
        }

        tasks = tasks.map( task => {
          return task.split( '' ).filter( char => {
            if ( !( char === ',' || char === '\'' )) {
              return true;
            }
          }).join( '' );
        });

        break;
      }

      default: {
        reject({ message: 'No task runner specified.' });
      }
    }

    resolve( tasks );
  });
};
