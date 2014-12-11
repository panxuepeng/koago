
var common = require("../common/index")

module.exports = {
	wellcome: function *() {
		this.body = 'hello world! ' + common.encrypt.md5('')
	}
}