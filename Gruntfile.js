module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      target: ['src/**/*.js', '!Gruntfile.js', '!node_modules/**/*.js']
    }
  });

  // loading modules
  grunt.loadNpmTasks('grunt-eslint');
  // additional tasks
  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('test', ['eslint']);
};
