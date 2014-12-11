var os = require('os')
	, path = require('path')
	, rootPath = path.normalize(__dirname + '/../')
	
var envMap = {
	'local': ['baike001']
}

module.exports = function(app) {
	app.root = rootPath
	console.log(['rootPath', rootPath])
	
	app.env = ''
	var hostname = os.hostname()
	
	for(var key in envMap) {
		if (envMap[key].indexOf(hostname) > -1) {
			app.env = key
			break
		}
	}
}