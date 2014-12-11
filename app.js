
var glob = require("glob")
var dateFormat = require('dateformat')
var koa = require('koa')
var app = koa()

require("./bootstrap/index")(app)
require("./config/index")(app)

require("./app/common/index")
require("./app/routes")(app)

// ע�����˳��
load(['app/models', 'app/controllers', 'app/events'])

app.port = app.port || 80
app.listen(app.port)

console.log(dateFormat('yyyy-mm-dd HH:MM:ss') + ' started on port '+ app.port)

module.exports = app


// ��������ĳ��Ŀ¼�µ�js�ļ�
function load(dirs) {
	for(var i=0; i < dirs.length; i++) {
		glob.sync(app.root + dirs[i] +'/**/*.js').forEach(function(file) {
			console.log(['load', file])
			require(file)
		})
	}
}
