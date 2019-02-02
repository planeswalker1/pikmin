module.exports = function(grunt) {

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      // compile stylus into css
      stylus: {
          compile: {
              options: {},
              files: {
                  'public/stylesheets/main.css': 'app/stylesheets/main.styl'
              }
          }
      },

      // watch for any updates and reload the page if so
      watch: {
          css: {
              files: ['gruntfile.js', 'app/stylesheets/*'],
              tasks: ['stylus'],
              options: { livereload: 10000 }
          },
          html: {
              files: ['app/views/*'],
              tasks: [],
              options: { livereload: 10000 }
          }
      }
  });

  // load tasks from node_modules
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // expose commands
  grunt.registerTask('default', ['stylus', 'watch']);
  grunt.registerTask('publish', ['stylus']);
};