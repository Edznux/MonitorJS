module.exports = function(grunt) {

// Project configuration.

grunt.initConfig({
  uglify: {
    all_src : {
      options : {
        sourceMap : true,
        sourceMapName : 'sourceMap.map'
      },
      src : 'assets/*.js',
      dest : 'public/js/frontend.min.js'
    }
  }
});

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
