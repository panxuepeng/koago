
var logsDir = app.dirs.logs

module.exports = {
	appenders: [
		{ type: 'console' },
		{
			// ������־
			category: 'access',
			type: 'dateFile',
			filename: logsDir + '/access/access.log',
			pattern: '_yyyy-MM-dd',
			maxLogSize: 1024000,
			backups:3
		},
		{
			// ����ʱ�쳣��־
			category: 'exception',
			type: 'dateFile',
			filename: logsDir + '/exception/exception.log',
			pattern: '_yyyy-MM-dd',
			maxLogSize: 1024000,
			backups:3
		},
		{
			// һ����Ϣ
			category: 'info',
			type: 'dateFile',
			filename: logsDir + '/info/info.log',
			pattern: '_yyyy-MM-dd',
			maxLogSize: 1024000,
			backups:3
		},
		{
			// ������־
			category: 'error',
			type: 'dateFile',
			filename: logsDir + '/error/error.log',
			pattern: '_yyyy-MM-dd',
			maxLogSize: 1024000,
			backups:3
		},
		{
			// ҵ����־
			category: 'biz',
			type: 'dateFile',
			filename: logsDir + '/biz/biz.log',
			pattern: '_yyyy-MM-dd',
			maxLogSize: 1024000,
			backups:3
		},
		{
			// ������־
			category: 'debug',
			type: 'file',
			filename: logsDir + '/debug/debug.log',
			maxLogSize: 1024000,
			backups:3
			 
		}
	],
	
	levels: {
        access: 'ALL',
        exception: 'ALL',
        info: 'ALL',
        error: 'ALL',
        biz: 'ALL',
        debug: 'ALL',
        perf: 'ALL'
    },
	
	replaceConsole: true
}
