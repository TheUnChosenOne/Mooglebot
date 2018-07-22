module.exports = function (wallaby) {

	process.env.NODE_ENV = 'test'; // eslint-disable-line no-process-env

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