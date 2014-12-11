
var mount = require('koa-mount')
var glob = require("glob")
var path = require("path")

module.exports = function(app) {
	
	var files = glob.sync(app.root+'/app/routes/**/*.js')
	console.log(['routes', files])
	
	files.forEach(function(file) {
		console.log(['router file', file])
		var name = path.basename(file, '.js')
		if ( name === 'index' ) {
			name = ''
		}
		console.log(['mount router', name])
		var router = require(file)
		
		app.use(mount('/'+name, router.middleware()))
		
	})
	
}

