/**
 * Grunt commands
 *
 *  default         - 
 *  dev             - 
 *  build           - 
 *  
 *
 */


module.exports = function (grunt) {

  // Load grunt modules
  require('load-grunt-tasks')(grunt);

  path = 'public';
  resourcesPath = 'resources/assets';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //------------------------------------//
    //  Style tasks
    //------------------------------------//

    // Compass
    compass: {
      options: {
        require : ['modernizr-mixin']
      },
      dev: {
        options: {
          httpPath       : path,
          cssDir         : resourcesPath + "/precss",
          sassDir        : resourcesPath + "/sass",
          imagesDir      : path + "/images",
          javascriptsDir : path + "/js",
          fontsDir       : path + "/fonts",
          outputStyle    : "expanded",
          relativeAssets : true,
          noLineComments : true,
          boring         : false,
          sourcemap      : true,
          watch          : true
        }
      },
      build: {
        options: {
          httpPath       : path,
          cssDir         : resourcesPath + "/precss",
          sassDir        : resourcesPath + "/sass",
          imagesDir      : path + "/images",
          javascriptsDir : path + "/js",
          fontsDir       : path + "/fonts",
          outputStyle    : "compressed",
          environment    : 'production',
          relativeAssets : true,
          noLineComments : true,
          boring         : true,
          sourcemap      : false
        }
      }
    },
    postcss: {
      options: {
        syntax: require('postcss-scss'),
        parser: require('postcss-scss')
      },
      dev: {
        options: {
          map: true,
          processors: [
            require('postcss-strip-inline-comments'),
            require('postcss-sorting'),
            require('postcss-assets')({loadPaths: [path+ '/images/']}),
            require('autoprefixer')({browsers: ['> 1%']})
          ]
        },
        files: [{
          expand: true,
          cwd: resourcesPath + "/precss/",
          src: ["*.css", "pages/**/*.css"],
          dest: path + "/css"
        }]
      },
      build: {
        options: {
          map: false,
          processors: [
            require('postcss-strip-inline-comments'),
            require('postcss-sorting'),
            require('postcss-assets')({loadPaths: [path+ '/images/']}),
            require('autoprefixer')({browsers: ['> 0%']}),
            require('cssnano')()
          ]
        },
        files: [{
          expand: true,
          cwd: resourcesPath + "/precss",
          src: ["*.css", "pages/**/*.css"],
          dest: path + "/css"
        }]
      },
      lint: {
        options: {
          processors: [
            require("stylelint")({ /* your options */ }),
            require("postcss-reporter")({ clearMessages: true })
          ]
        },
        files: [{
          expand: true,
          cwd: resourcesPath + "/precss/",
          src: ["*.css", "pages/**/*.css"],
          dest: path + "/css"
        }]
      }
    }, // postcss

    //------------------------------------//
    //  Clean
    //------------------------------------//

    clean: {
      cssmaps: [path + "/css/*.css.map"]
    },

    //------------------------------------//
    //  Concurrent
    //------------------------------------//
    
    concurrent: {
      watch: {
        tasks: ['watch', 'compass:dev'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    //------------------------------------//
    //  Assets
    //------------------------------------//
    
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          src: [path + "/images/**/*.{png,jpg,gif,jpeg}"]
        }]
      }
    },

    //------------------------------------//
    //  Watch
    //------------------------------------//

    watch: {
      postcss: {
        files: [resourcesPath + "/precss/**/*.css"],
        tasks: ['postcss:dev']
      },
      css: {
        files: [path + "/css/**/*.css"]
      },
      livereload: {
        files: [path + "/css/**/*.css"],
        options: {
          livereload: true
        }
      }
    },
    notify: {
      js_compiled: {
        options: {
          title: 'Task Complete', 
          message: 'Grunt finished running.',
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', [
    'concurrent:watch'
  ]);
  // Dev
  grunt.registerTask('dev', [
    'compass:dev',
    'postcss:dev'
  ]);
  // Build
  grunt.registerTask('build', [
    'imagemin',
    'compass:build',
    'postcss:build'
  ]);

};