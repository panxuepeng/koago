

module.exports = {
	wellcome: function *(next) {
		this.logger.debug('aa')
		this.body = 'hello world! ' + this.util.md5('')
	}
}