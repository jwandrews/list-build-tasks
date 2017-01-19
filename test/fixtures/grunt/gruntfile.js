const grunt = require( 'grunt' );

module.exports = function( grunt ) {
  grunt.initConfig();
  grunt.registerTask( 'build', [ 'list', 'of', 'tasks' ]);
  grunt.registerTask( 'default', [ 'build' ]);
};
