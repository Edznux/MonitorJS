module.exports = function(grunt) {

// Project configuration.

grunt.initConfig({
  uglify: {
    all_src : {
      options : {
        sourceMap : false,
        // sourceMap : true,
        sourceMapName : 'sourceMap.map'
      },
      src : 'assets/*.js',
      dest : 'public/js/frontend.js'
    }
  },
  watch: {
    js: {
      files: ['assets/*.js'],
      tasks: ['uglify']
    }
  }
});


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
};
