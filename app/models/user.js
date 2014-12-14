/**
 * User Collection
 */

var mongoose = require('mongoose')
	, _ = require('underscore')
	, Schema = mongoose.Schema


var UserSchema = new Schema({
	username: {type: String, unique: true, required: "用户名不能为空"}
	
	, mobile: String
	
	, password: {type: String, required: "密码不能为空"}
	
	, realname: String
	
	, address: {type: String}
	
	, created_time: {type: Date, default: Date.now}
	
	// 用户状态: 0删除 1正常
	, status: {type: Number, default: 1}
})


UserSchema.path('username').validate(function(value){
	return /^(?:[a-z0-9]+[_\-+.]?)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i.test(value)
}, '用户名需要是一个有效的Email')

UserSchema.path('realname').validate(function(value){
	if ( value.length <= 10 ) {
		return true
	}
	return false
}, "姓名最长为10个字符")

UserSchema.path('mobile').validate(function(value){
	if ( (value.length == 0) || (/^1[3-9]\d{9}$/.test(value)) ) {
		return true
	}
	return false
}, "手机号码格式错误")

/**
 * Methods
 */
UserSchema.methods = {
	
}

UserSchema.statics = {
	
}

mongoose.model('User', UserSchema)