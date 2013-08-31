module.exports = function ( grunt ) {

	// Project configuration.
	grunt.initConfig( {
		beautify : {
			tests : 'test/**/*.js',
			files : ['package.json', 'grunt.js', 'tasks/**/*.js']
		},
		nodeunit : {
			all : ['test/**/*.js']
		},
		watch : {
			files : '<config:lint.files>',
			tasks : 'default'
		},
		beautifier : {
			options : {
				indentSize : 2
			},
			tests : {
				options : {
					indentSize : 4
				}
			}
		},
		jshint : {
			options : {
				curly : true,
				eqeqeq : true,
				immed : true,
				latedef : true,
				newcap : true,
				noarg : true,
				sub : true,
				undef : true,
				boss : true,
				eqnull : true,
				node : true,
				es5 : true,
				strict:false
			},
			globals : {},
			all:['package.json', 'grunt.js', 'tasks/**/*.js', 'test/**/*.js']
		}
	} );

	// Load local tasks.
	grunt.loadTasks( 'tasks' );
	grunt.loadNpmTasks( 'grunt-beautify' );
	grunt.loadNpmTasks( 'grunt-contrib-nodeunit' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );

	// Default task.
	grunt.registerTask( 'default', ['beautify', 'jshint', 'nodeunit'] );

};
