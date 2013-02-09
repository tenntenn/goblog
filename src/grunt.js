/*global module:false*/
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-typescript');

	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		lint: {
			files: [
				'src/*.js',
				'src/base/*.js',
			]
		},
		min: {
			dist: {
				src: ['<banner:meta.banner>','<config:requirejs.out>'],
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		shell: {	
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'default'
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true
			},
			globals: {
				"console":true,
				"define": true
			}
		},
		
	});

	// Create API documnet
	grunt.registerTask('go', 'shell:go');

	// Default task.
	grunt.registerTask('default', 'lint requirejs min test doc');

};
