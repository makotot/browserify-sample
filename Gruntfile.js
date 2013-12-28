module.exports = function (grunt) {

	require('time-grunt')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		path: {
			src: 'src'
		},

		watch: {
			options: {
				livereload: true
			},
			html: {
				files: ['<%= path.src %>/**/*.hbs'],
				tasks: ['newer:assemble']
			},
			js: {
				files: ['<%= path.src %>/js/bundle/**/*.js'],
				tasks: ['browserify', 'newer:copy:js']
			},
			css: {
				files: ['<%= path.src %>/sass/**/*.sass'],
				tasks: ['sass', 'newer:copy:css']
			}
		},

		connect: {
			livereload: {
				options: {
					port: 9001,
					hostname: '0.0.0.0',
					base: './',
					open: false,
					middleware: function (connect, options) {
						return [
							require('connect-livereload')(),
							connect.static(options.base),
							connect.directory(options.base)
						];
					}
				}
			}
		},

		assemble: {
			options: {
				layoutdir: '<%= path.src %>/layouts/',
				layout: 'default.hbs',
				partials: ['<%= path.src %>/layouts/partials/**/*.hbs'],
				data: '<%= path.src %>/data/*',
				flatten: true
			},
			dev: {
				files: [
					{
						expand: true,
						cwd: '<%= path.src %>/',
						src: '*.hbs',
						dest: './'
					}
				]
			}
		},

		bower: {
			install: {
				options: {
					copy: false
				}
			}
		},

		copy: {
			bower: {
				files: [
					{
						expand: true,
						flatten: true,
						src: 'bower_components/**/*.js',
						dest: 'js/lib'
					},
					{
						expand: true,
						flatten: true,
						src: 'bower_components/**/*.css',
						dest: 'css/lib'
					},
					{
						expand: true,
						flatten: true,
						src: 'bower_components/**/*.map',
						dest: 'js/lib'
					}
				]
			},
			js: {
				files: [
					{
						expand: true,
						flatten: true,
						src: '<%= path.src %>/js/*.js',
						dest: 'js/'
					}
				]
			},
			css: {
				files: [
					{
						expand: true,
						flatten: true,
						src: '<%= path.src %>/css/*.css',
						dest: 'css/'
					}
				]
			}
		},

		browserify: {
			dist: {
				files: {
					'<%= path.src %>/js/main.js': ['<%= path.src %>/js/bundle/main.js'],
					'<%= path.src %>/js/sample.js': ['<%= path.src %>/js/bundle/sample.js']
				}
			}
		},

		sass: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= path.src %>/sass',
						src: ['*.sass'],
						dest: '<%= path.src %>/css/',
						ext: '.css'
					}
				]
			}
		}

	});

	require('load-grunt-tasks')(grunt, {
		pattern: ['assemble', 'grunt-*']
	});

	grunt.registerTask('default', ['newer:assemble', 'browserify', 'sass']);
	grunt.registerTask('install', ['bower:install', 'newer:copy:bower']);
	grunt.registerTask('serve', ['newer:assemble', 'browserify', 'sass', 'newer:copy:js', 'newer:copy:css', 'connect', 'watch']);
};
