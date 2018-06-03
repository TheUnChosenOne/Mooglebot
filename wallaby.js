module.exports = function (wallaby) {
	return {
		files: [
			'myapi/**/*.js',
		],

		tests: [
			'Main.js'
		],

		compilers: {
			'**/*.js': wallaby.compilers.babel()
		}
	}
}