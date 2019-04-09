var aws = require("aws-sdk")
var nodemailer = require("nodemailer")

var ses = new aws.SES()
var s3 = new aws.S3()

exports.handler = (event, context, callback) => {
	// TODO implement
	// callback(null, 'Hello from Lambda')
};
